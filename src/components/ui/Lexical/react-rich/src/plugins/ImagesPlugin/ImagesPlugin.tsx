'use client'
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { JSX } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $wrapNodeInElement, mergeRegister } from '@lexical/utils'
import {
  $createParagraphNode,
  $createRangeSelection,
  $getSelection,
  $insertNodes,
  $isNodeSelection,
  $isRootOrShadowRoot,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
  getDOMSelectionFromTarget,
  isHTMLElement,
  LexicalCommand,
  LexicalEditor
} from 'lexical'
import { useEffect, useRef, useState } from 'react'
import * as React from 'react'
import { $createImageNode, $isImageNode, ImageNode, ImagePayload } from '../../nodes/ImageNode/ImageNode'
import { Input } from '@components/ui/Form/Input/Input'
import { Label } from '@components/ui/Form/Label/Label'
import { Button } from '@components/ui/Button/Button'
import { CAN_USE_DOM } from '../shared/canUseDOM'
import { ImageSVG } from '@components/ui/SVG/SVG'
import { Popover, PopoverContent } from '@components/ui/Popover/Popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/Tabs/Tabs'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import styles from './ImagesPlugin.module.css'
import lexicalStyles from '../../Lexical.module.css'

export type InsertImagePayload = Readonly<ImagePayload>

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> = createCommand('INSERT_IMAGE_COMMAND')

// No need to seperate the functionality for upload in this case we can just use one component letting us upload both
export function InsertImageDialog({ activeEditor }: { activeEditor: LexicalEditor }): JSX.Element {
  const [url, setUrl] = useState('')
  const [file, setFile] = useState<string>('')
  const [open, setOpen] = useState(false)
  const hasModifier = useRef(false)

  useEffect(() => {
    hasModifier.current = false
    const handler = (e: KeyboardEvent) => {
      hasModifier.current = e.altKey
    }
    document.addEventListener('keydown', handler)
    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [activeEditor])

  const uploadFromFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const reader = new FileReader()
    reader.onload = function () {
      if (typeof reader.result === 'string') {
        setFile(reader.result)

        activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, {
          altText: new Date().toISOString(),
          src: reader.result
        })

        // Close the popover after uploading
        setOpen(false)
      }
      return ''
    }
    if (files !== null) {
      reader.readAsDataURL(files[0])
    }
  }

  const uploadFromUrl = () => {
    if (url) {
      activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        altText: new Date().toISOString(),
        src: url
      })

      // Close the popover and reset URL
      setOpen(false)
      setUrl('')
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button icon={<ImageSVG />} aria-label="Insert Image" size="xs" />
      </PopoverTrigger>
      <PopoverContent>
        <Tabs>
          <TabsList>
            <TabsTrigger value="file">File</TabsTrigger>
            <TabsTrigger value="url">Url</TabsTrigger>
          </TabsList>
          <TabsContent value="file">
            <TabContentContainer>
              <FlexContainer width="inherit" paddingSize="s">
                <Input id="imagePluginFileUpload" type="file" accept="image/*" onChange={uploadFromFile} />
              </FlexContainer>
            </TabContentContainer>
          </TabsContent>
          <TabsContent value="url">
            <TabContentContainer>
              <FlexContainer gapSize="xs" width="inherit" paddingSize="s">
                <FlexContainer>
                  <Label htmlFor="imagePluginUrl" label="Enter Url" />
                  <Input id="imagePluginUrl" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                </FlexContainer>
                <Button text="Insert" disabled={url === ''} onClick={uploadFromUrl} />
              </FlexContainer>
            </TabContentContainer>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}

const TabContentContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.tabContentContainer}>{children}</div>
}

export default function ImagesPlugin({ captionsEnabled }: { captionsEnabled?: boolean }): JSX.Element | null {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagesPlugin: ImageNode not registered on editor')
    }

    return mergeRegister(
      editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload)
          $insertNodes([imageNode])
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd()
          }

          return true
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand<DragEvent>(
        DRAGSTART_COMMAND,
        (event) => {
          return $onDragStart(event)
        },
        COMMAND_PRIORITY_HIGH
      ),
      editor.registerCommand<DragEvent>(
        DRAGOVER_COMMAND,
        (event) => {
          return $onDragover(event)
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<DragEvent>(
        DROP_COMMAND,
        (event) => {
          return $onDrop(event, editor)
        },
        COMMAND_PRIORITY_HIGH
      )
    )
  }, [captionsEnabled, editor])

  return null
}

const TRANSPARENT_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

// Lazy initialization
let img: HTMLImageElement | null = null

function getTransparentImage(): HTMLImageElement | null {
  if (!CAN_USE_DOM) return null

  if (!img) {
    img = document.createElement('img')
    img.src = TRANSPARENT_IMAGE
  }
  return img
}

function $onDragStart(event: DragEvent): boolean {
  console.log('onDragStart', event)
  const transparentImg = getTransparentImage()
  if (transparentImg) {
    // Use transparentImg here
  }
  const node = $getImageNodeInSelection()
  if (!node) {
    return false
  }
  const dataTransfer = event.dataTransfer
  if (!dataTransfer) {
    return false
  }
  dataTransfer.setData('text/plain', '_')
  if (img) {
    dataTransfer.setDragImage(img, 0, 0)
  }
  dataTransfer.setData(
    'application/x-lexical-drag',
    JSON.stringify({
      data: {
        altText: node.__altText,
        height: node.__height,
        key: node.getKey(),
        maxWidth: node.__maxWidth,
        src: node.__src,
        width: node.__width
      },
      type: 'image'
    })
  )

  return true
}

function $onDragover(event: DragEvent): boolean {
  const node = $getImageNodeInSelection()
  if (!node) {
    return false
  }
  if (!canDropImage(event)) {
    console.warn('Cannot drop image here')
    event.preventDefault()
  }
  return true
}

function $onDrop(event: DragEvent, editor: LexicalEditor): boolean {
  const node = $getImageNodeInSelection()
  if (!node) {
    return false
  }
  const data = getDragImageData(event)
  if (!data) {
    return false
  }
  event.preventDefault()
  if (canDropImage(event)) {
    const range = getDragSelection(event)
    node.remove()
    const rangeSelection = $createRangeSelection()
    if (range !== null && range !== undefined) {
      rangeSelection.applyDOMRange(range)
    }
    $setSelection(rangeSelection)
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, data)
  }
  return true
}

function $getImageNodeInSelection(): ImageNode | null {
  const selection = $getSelection()
  if (!$isNodeSelection(selection)) {
    return null
  }
  const nodes = selection.getNodes()
  const node = nodes[0]
  return $isImageNode(node) ? node : null
}

function getDragImageData(event: DragEvent): null | InsertImagePayload {
  const dragData = event.dataTransfer?.getData('application/x-lexical-drag')
  if (!dragData) {
    return null
  }
  const { type, data } = JSON.parse(dragData)
  if (type !== 'image') {
    return null
  }

  return data
}

declare global {
  interface DragEvent {
    rangeOffset?: number
    rangeParent?: Node
  }
}

function canDropImage(event: DragEvent): boolean {
  const target = event.target
  return !!(
    isHTMLElement(target) &&
    !target.closest(`code, span.${styles['editor-image']}`) &&
    isHTMLElement(target.parentElement) &&
    target.parentElement.closest(`${styles['editor-input']}`) === null
  )
}

function getDragSelection(event: DragEvent): Range | null | undefined {
  let range
  const domSelection = getDOMSelectionFromTarget(event.target)

  if (document.caretPositionFromPoint) {
    const caretPosition = document.caretPositionFromPoint(event.clientX, event.clientY)
    if (caretPosition) {
      range = document.createRange()
      range.setStart(caretPosition.offsetNode, caretPosition.offset)
      range.collapse(true)
    }
  } else if (event.rangeParent && domSelection !== null) {
    domSelection.collapse(event.rangeParent, event.rangeOffset || 0)
    range = domSelection.getRangeAt(0)
  } else {
    throw Error(`Cannot get the selection when dragging`)
  }

  return range
}
