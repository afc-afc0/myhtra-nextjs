/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { $isCodeNode } from '@lexical/code'
import { $getNearestNodeFromDOMNode, $getSelection, $setSelection, LexicalEditor } from 'lexical'
import * as React from 'react'
import { useState } from 'react'

import { useDebounce } from '../../utils'

import styles from '../../CodeActionMenuPlugin.module.css'
import { Button } from '@components/ui/Button/Button'
import { CheckWithCircleSVG, CopyContentSVG } from '@components/ui/SVG/SVG'
import { ConditionalDisplay } from '@components/ui/ConditionalDisplay/ConditionalDisplay'

interface Props {
  editor: LexicalEditor
  getCodeDOMNode: () => HTMLElement | null
}

export function CopyButton({ editor, getCodeDOMNode }: Props) {
  const [isCopyCompleted, setCopyCompleted] = useState<boolean>(false)

  const removeSuccessIcon = useDebounce(() => {
    setCopyCompleted(false)
  }, 1000)

  async function handleClick(): Promise<void> {
    const codeDOMNode = getCodeDOMNode()

    if (!codeDOMNode) {
      return
    }

    let content = ''

    editor.update(() => {
      const codeNode = $getNearestNodeFromDOMNode(codeDOMNode)

      if ($isCodeNode(codeNode)) {
        content = codeNode.getTextContent()
      }

      const selection = $getSelection()
      $setSelection(selection)
    })

    try {
      await navigator.clipboard.writeText(content)
      setCopyCompleted(true)
      removeSuccessIcon()
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return <Button icon={<CopyIcon isCopyCompleted={isCopyCompleted} />} size="xs" aria-label="copy" onClick={handleClick} />
}

const CopyIcon = ({ isCopyCompleted }: { isCopyCompleted: boolean }) => {
  return (
    <>
      <ConditionalDisplay condition={isCopyCompleted}>
        <CheckWithCircleSVG />
      </ConditionalDisplay>
      <ConditionalDisplay condition={!isCopyCompleted}>
        <CopyContentSVG />
      </ConditionalDisplay>
    </>
  )
}
