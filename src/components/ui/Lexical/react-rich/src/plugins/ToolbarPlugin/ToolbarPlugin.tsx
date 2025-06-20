'use client'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

import {
  $createParagraphNode,
  $getNodeByKey,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  $isTextNode,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_NORMAL,
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  KEY_MODIFIER_COMMAND,
  LexicalEditor,
  NodeKey,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND
} from 'lexical'
import { Dispatch, JSX, useCallback, useEffect, useRef, useState } from 'react'

import styles from '../../Lexical.module.css'

import { $createCodeNode, $isCodeNode, CODE_LANGUAGE_FRIENDLY_NAME_MAP, CODE_LANGUAGE_MAP, getLanguageFriendlyName } from '@lexical/code'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { $isTableNode, $isTableSelection } from '@lexical/table'
import { $createHeadingNode, $createQuoteNode, $isHeadingNode, $isQuoteNode, HeadingTagType } from '@lexical/rich-text'
import { $getSelectionStyleValueForProperty, $isParentElementRTL, $patchStyleText, $setBlocksType } from '@lexical/selection'
import {
  $findMatchingParent,
  $getNearestBlockElementAncestorOrThrow,
  $getNearestNodeOfType,
  $isEditorIsNestedEditor,
  mergeRegister
} from '@lexical/utils'

import { Button } from '@components/ui/Button/Button'
import {
  BoldSVG,
  ClearFormattionSVG,
  InsertLinkSVG,
  ItalicSVG,
  RedoSVG,
  StrikeThroughSVG,
  TextAlignCenterSVG,
  TextAlignJustifySVG,
  TextAlignLeftSVG,
  TextAlignRightSVG,
  UnderlineSVG,
  UndoSVG
} from '@components/ui/SVG/SVG'
import { Toggle } from '@components/ui/Toggle/Toggle'
import { $isListNode, INSERT_CHECK_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, ListNode } from '@lexical/list'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/Form/Select/Select'
import { ConditionalDisplay } from '@components/ui/ConditionalDisplay/ConditionalDisplay'
import { $isDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode'
import { getSelectedNode } from '../shared/getSelectedNode'
import { sanitizeUrl } from '../shared/url'
import { formatBulletList, formatCheckList, formatCode, formatHeading, formatNumberedList, formatParagraph, formatQuote } from './utils'
import { InsertImageDialog } from '../ImagesPlugin/ImagesPlugin'

function Divider() {
  return <div className={styles['divider']} />
}

export default function ToolbarPlugin({ setIsLinkEditMode }: { setIsLinkEditMode: Dispatch<boolean> }): JSX.Element {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [blockType, setBlockType] = useState<keyof typeof blockTypeToBlockName>(blockTypes.paragraph.value)
  const [rootType, setRootType] = useState<keyof typeof rootTypeToRootName>('root')
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null)
  const [fontSize, setFontSize] = useState<string>('15px')
  const [fontColor, setFontColor] = useState<string>('#000')
  const [bgColor, setBgColor] = useState<string>('#fff')
  const [fontFamily, setFontFamily] = useState<string>('Arial')
  const [elementFormat, setElementFormat] = useState<ElementFormatType>('left')
  const [isLink, setIsLink] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [isSubscript, setIsSubscript] = useState(false)
  const [isSuperscript, setIsSuperscript] = useState(false)
  const [isCode, setIsCode] = useState(false)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  // const [modal, showModal] = useModal();
  const [isRTL, setIsRTL] = useState(false)
  const [codeLanguage, setCodeLanguage] = useState<string>('')
  const [isEditable, setIsEditable] = useState(() => editor.isEditable())
  const [isImageCaption, setIsImageCaption] = useState(false)

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      if (activeEditor !== editor && $isEditorIsNestedEditor(activeEditor)) {
        const rootElement = activeEditor.getRootElement()
        setIsImageCaption(!!rootElement?.parentElement?.classList.contains('image-caption-container'))
      } else {
        setIsImageCaption(false)
      }

      const anchorNode = selection.anchor.getNode()
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent()
              return parent !== null && $isRootOrShadowRoot(parent)
            })

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow()
      }

      const elementKey = element.getKey()
      const elementDOM = activeEditor.getElementByKey(elementKey)

      // Update text format
      setIsBold(selection.hasFormat('bold'))
      setIsItalic(selection.hasFormat('italic'))
      setIsUnderline(selection.hasFormat('underline'))
      setIsStrikethrough(selection.hasFormat('strikethrough'))
      setIsSubscript(selection.hasFormat('subscript'))
      setIsSuperscript(selection.hasFormat('superscript'))
      setIsCode(selection.hasFormat('code'))
      setIsRTL($isParentElementRTL(selection))

      // Update links
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true)
      } else {
        setIsLink(false)
      }

      const tableNode = $findMatchingParent(node, $isTableNode)
      if ($isTableNode(tableNode)) {
        setRootType('table')
      } else {
        setRootType('root')
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey)
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode)
          const type = parentList ? parentList.getListType() : element.getListType()
          setBlockType(type)
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType()
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName)
          }
          if ($isCodeNode(element)) {
            const language = element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP
            setCodeLanguage(language ? CODE_LANGUAGE_MAP[language] || language : '')
            return
          }
        }
      }
      // Handle buttons
      setFontColor($getSelectionStyleValueForProperty(selection, 'color', '#000'))
      setBgColor($getSelectionStyleValueForProperty(selection, 'background-color', '#fff'))
      setFontFamily($getSelectionStyleValueForProperty(selection, 'font-family', 'Arial'))
      let matchingParent
      if ($isLinkNode(parent)) {
        // If node is a link, we need to fetch the parent paragraph node to set format
        matchingParent = $findMatchingParent(node, (parentNode) => $isElementNode(parentNode) && !parentNode.isInline())
      }

      // If matchingParent is a valid node, pass it's format type
      setElementFormat(
        $isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
            ? node.getFormatType()
            : parent?.getFormatType() || 'left'
      )
    }
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      setFontSize($getSelectionStyleValueForProperty(selection, 'font-size', '15px'))
    }
  }, [activeEditor, editor])

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor)
        $updateToolbar()
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )
  }, [editor, $updateToolbar])

  useEffect(() => {
    activeEditor.getEditorState().read(() => {
      $updateToolbar()
    })
  }, [activeEditor, $updateToolbar])

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable)
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar()
        })
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      )
    )
  }, [$updateToolbar, activeEditor, editor])

  useEffect(() => {
    return activeEditor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (payload) => {
        const event: KeyboardEvent = payload
        const { code, ctrlKey, metaKey } = event

        if (code === 'KeyK' && (ctrlKey || metaKey)) {
          event.preventDefault()
          let url: string | null
          if (!isLink) {
            setIsLinkEditMode(true)
            url = sanitizeUrl('https://')
          } else {
            setIsLinkEditMode(false)
            url = null
          }
          return activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, url)
        }
        return false
      },
      COMMAND_PRIORITY_NORMAL
    )
  }, [activeEditor, isLink, setIsLinkEditMode])

  const applyStyleText = useCallback(
    (styles: Record<string, string>, skipHistoryStack?: boolean) => {
      activeEditor.update(
        () => {
          const selection = $getSelection()
          if (selection !== null) {
            $patchStyleText(selection, styles)
          }
        },
        skipHistoryStack ? { tag: 'historic' } : {}
      )
    },
    [activeEditor]
  )

  const clearFormatting = useCallback(() => {
    activeEditor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection) || $isTableSelection(selection)) {
        const anchor = selection.anchor
        const focus = selection.focus
        const nodes = selection.getNodes()
        const extractedNodes = selection.extract()
        if (anchor.key === focus.key && anchor.offset === focus.offset) {
          return
        }

        nodes.forEach((node, idx) => {
          // We split the first and last node by the selection
          // So that we don't format unselected text inside those nodes
          if ($isTextNode(node)) {
            let textNode = node
            if (idx === 0 && anchor.offset !== 0) {
              textNode = textNode.splitText(anchor.offset)[1] || textNode
            }
            if (idx === nodes.length - 1) {
              textNode = textNode.splitText(focus.offset)[0] || textNode
            }

            const extractedTextNode = extractedNodes[0]
            if (nodes.length === 1 && $isTextNode(extractedTextNode)) {
              textNode = extractedTextNode
            }

            if (textNode.__style !== '') {
              textNode.setStyle('')
            }
            if (textNode.__format !== 0) {
              textNode.setFormat(0)
              $getNearestBlockElementAncestorOrThrow(textNode).setFormat('')
            }
            node = textNode
          } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
            node.replace($createParagraphNode(), true)
          } else if ($isDecoratorBlockNode(node)) {
            node.setFormat('')
          }
        })
      }
    })
  }, [activeEditor])

  const onFontColorSelect = useCallback(
    (value: string, skipHistoryStack: boolean) => {
      applyStyleText({ color: value }, skipHistoryStack)
    },
    [applyStyleText]
  )

  const onBgColorSelect = useCallback(
    (value: string, skipHistoryStack: boolean) => {
      applyStyleText({ 'background-color': value }, skipHistoryStack)
    },
    [applyStyleText]
  )

  const insertLink = useCallback(() => {
    if (!isLink) {
      setIsLinkEditMode(true)
      activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'))
    } else {
      setIsLinkEditMode(false)
      activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
  }, [activeEditor, isLink, setIsLinkEditMode])

  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      activeEditor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey)
          if ($isCodeNode(node)) {
            node.setLanguage(value)
          }
        }
      })
    },
    [activeEditor, selectedElementKey]
  )

  // const insertGifOnClick = (payload: InsertImagePayload) => {
  //   activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
  // };

  const canViewerSeeInsertDropdown = !isImageCaption
  const canViewerSeeInsertCodeButton = !isImageCaption

  return (
    <Container>
      <Button
        icon={<UndoSVG />}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined)
        }}
        disabled={!canUndo}
        aria-label={'Undo'}
        size="xs"
      />
      <Button
        icon={<RedoSVG />}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined)
        }}
        disabled={!canRedo}
        aria-label={'Redo'}
        size="xs"
      />
      <Divider />
      <ConditionalDisplay condition={blockType in blockTypeToBlockName && activeEditor === editor}>
        <BlockFormatDropDown editor={activeEditor} blockType={blockType} rootType={rootType} disabled={!isEditable} />
        <Divider />
      </ConditionalDisplay>
      <ConditionalDisplay condition={blockType === 'code'}>
        <CodeLanguageOptionSelect codeLanguage={codeLanguage} onCodeLanguageSelect={onCodeLanguageSelect} disabled={!isEditable} />
      </ConditionalDisplay>
      <ConditionalDisplay condition={blockType !== 'code'}>
        <Toggle
          icon={<BoldSVG />}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
          }}
          isPressed={isBold}
          aria-label={'Bold'}
          size="xs"
        />
        <Toggle
          icon={<ItalicSVG />}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
          }}
          isPressed={isItalic}
          aria-label={'Italic'}
          size="xs"
        />
        <Toggle
          icon={<UnderlineSVG />}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
          }}
          isPressed={isUnderline}
          aria-label={'Underline'}
          size="xs"
        />
        <Toggle
          icon={<StrikeThroughSVG />}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
          }}
          isPressed={isStrikethrough}
          aria-label={'Strikethrough'}
          size="xs"
        />
        <Divider />
        <Button
          icon={<TextAlignLeftSVG />}
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
          }}
          aria-label="Left Align"
          size="xs"
        />
        <Button
          icon={<TextAlignCenterSVG />}
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
          }}
          aria-label="Center Align"
          size="xs"
        />
        <Button
          icon={<TextAlignRightSVG />}
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
          }}
          aria-label="Right Align"
          size="xs"
        />
        <Button
          icon={<TextAlignJustifySVG />}
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')
          }}
          aria-label="Justify Align"
          size="xs"
        />
        <Toggle icon={<InsertLinkSVG />} isPressed={isLink} onClick={insertLink} aria-label="Insert Link" size="xs" />
        <Button icon={<ClearFormattionSVG />} onClick={clearFormatting} aria-label="Clear Formatting" size="xs" />
      </ConditionalDisplay>
      <ConditionalDisplay condition={true}>
        <InsertImageDialog activeEditor={activeEditor} />
      </ConditionalDisplay>
    </Container>
  )
}

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.toolbarContainer}>{children}</div>
}

interface LanguageOption {
  label: string
  value: string
}

function getCodeLanguageOptions(): Record<string, LanguageOption> {
  const options: Record<string, LanguageOption> = {}

  for (const [lang, friendlyName] of Object.entries(CODE_LANGUAGE_FRIENDLY_NAME_MAP)) {
    options[lang] = { label: friendlyName, value: lang }
  }

  return options
}

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions()

const CodeLanguageOptionSelect = ({
  codeLanguage,
  disabled,
  onCodeLanguageSelect
}: {
  codeLanguage: string
  disabled: boolean
  onCodeLanguageSelect: (value: string) => void
}) => {
  return (
    <ToolbarSelectContainer>
      <Select value={codeLanguage} disabled={disabled} onValueChange={(value) => onCodeLanguageSelect(value)} defaultValue={codeLanguage}>
        <SelectTrigger size="xs" aria-label="Select Language">
          <SelectValue aria-label={codeLanguage}>{CODE_LANGUAGE_OPTIONS[codeLanguage]?.label || '-'}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.entries(CODE_LANGUAGE_OPTIONS).map(([value, option]) => (
            <SelectItem key={value} value={value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ToolbarSelectContainer>
  )
}

const ToolbarSelectContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.toolbarSelectContainer}>{children}</div>
}

const blockTypes = {
  bullet: { label: 'Bulleted List', value: 'bullet' },
  check: { label: 'Check List', value: 'check' },
  code: { label: 'Code Block', value: 'code' },
  h1: { label: 'Heading 1', value: 'h1' },
  h2: { label: 'Heading 2', value: 'h2' },
  h3: { label: 'Heading 3', value: 'h3' },
  h4: { label: 'Heading 4', value: 'h4' },
  h5: { label: 'Heading 5', value: 'h5' },
  h6: { label: 'Heading 6', value: 'h6' },
  number: { label: 'Numbered List', value: 'number' },
  paragraph: { label: 'Normal', value: 'paragraph' },
  quote: { label: 'Quote', value: 'quote' }
}

const blockTypeToBlockName = {
  [blockTypes.bullet.value]: blockTypes.bullet.label,
  [blockTypes.check.value]: blockTypes.check.label,
  [blockTypes.code.value]: blockTypes.code.label,
  [blockTypes.h1.value]: blockTypes.h1.label,
  [blockTypes.h2.value]: blockTypes.h2.label,
  [blockTypes.h3.value]: blockTypes.h3.label,
  [blockTypes.h4.value]: blockTypes.h4.label,
  [blockTypes.h5.value]: blockTypes.h5.label,
  [blockTypes.h6.value]: blockTypes.h6.label,
  [blockTypes.number.value]: blockTypes.number.label,
  [blockTypes.paragraph.value]: blockTypes.paragraph.label,
  [blockTypes.quote.value]: blockTypes.quote.label
}

const rootTypeToRootName = {
  root: 'Root',
  table: 'Table'
}

const BlockFormatDropDown = ({
  editor,
  blockType,
  disabled = false
}: {
  blockType: keyof typeof blockTypeToBlockName
  rootType: keyof typeof rootTypeToRootName
  editor: LexicalEditor
  disabled?: boolean
}) => {
  return (
    <ToolbarSelectContainer>
      <Select value={blockType.toString()} defaultValue={blockTypes.paragraph.value} disabled={disabled}>
        <SelectTrigger size="xs">
          <SelectValue aria-label={blockType.toString()}>{blockTypeToBlockName[blockType]}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={blockTypes.paragraph.value} onClick={() => formatParagraph(editor)}>
            {blockTypes.paragraph.label}
          </SelectItem>
          <SelectItem value={blockTypes.h1.value} onClick={() => formatHeading(editor, blockType, blockTypes.h1.value as HeadingTagType)}>
            {blockTypes.h1.label}
          </SelectItem>
          <SelectItem value={blockTypes.h2.value} onClick={() => formatHeading(editor, blockType, blockTypes.h2.value as HeadingTagType)}>
            {blockTypes.h2.label}
          </SelectItem>
          <SelectItem value={blockTypes.h3.value} onClick={() => formatHeading(editor, blockType, blockTypes.h3.value as HeadingTagType)}>
            {blockTypes.h3.label}
          </SelectItem>
          <SelectItem value={blockTypes.bullet.value} onClick={() => formatBulletList(editor, blockType as HeadingTagType)}>
            {blockTypes.bullet.label}
          </SelectItem>
          <SelectItem value={blockTypes.check.value} onClick={() => formatCheckList(editor, blockType as HeadingTagType)}>
            {blockTypes.check.label}
          </SelectItem>
          <SelectItem value={blockTypes.number.value} onClick={() => formatNumberedList(editor, blockType as HeadingTagType)}>
            {blockTypes.number.label}
          </SelectItem>
          <SelectItem value={blockTypes.quote.value} onClick={() => formatQuote(editor, blockType as HeadingTagType)}>
            {blockTypes.quote.label}
          </SelectItem>
          <SelectItem value={blockTypes.code.value} onClick={() => formatCode(editor, blockType as HeadingTagType)}>
            {blockTypes.code.label}
          </SelectItem>
        </SelectContent>
      </Select>
    </ToolbarSelectContainer>
  )
}
