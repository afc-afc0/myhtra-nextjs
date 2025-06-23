'use client'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { AutoLinkNode, LinkNode } from '@lexical/link'

import { LexicalStyles } from './LexicalStyles'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { ListNode, ListItemNode } from '@lexical/list'
import { CodeNode, CodeHighlightNode } from '@lexical/code'
import { forwardRef, ReactElement, useEffect, useRef, useState } from 'react'
import { ConditionalDisplay } from '@components/ui/ConditionalDisplay/ConditionalDisplay'
import { CAN_USE_DOM } from './plugins/shared/canUseDOM'
import { useLexicalEditable } from '@lexical/react/useLexicalEditable'

import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin/ListMaxIndentLevelPlugin'
import ToolbarPlugin from './plugins/ToolbarPlugin/ToolbarPlugin'
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin'

import styles from './Lexical.module.css'
import LinkPlugin from './plugins/LinkPlugin/LinkPlugin'
import LexicalAutoLinkPlugin from './plugins/AutoLinkPlugin/AutoLinkPlugin'
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin/FloatingLinkEditorPlugin'
import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin/CodeActionMenuPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import ShortcutsPlugin from './plugins/ShortcutsPlugin/ShortcutsPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { ToolbarContext } from './context/ToolbarContext'
import ImagesPlugin from './plugins/ImagesPlugin/ImagesPlugin'
import { ImageNode } from './nodes/ImageNode/ImageNode'

export const LexicalRichText = ({
  onChange,
  readonly = false,
  initialContent = undefined,
  id
}: {
  onChange?: any
  readonly?: boolean
  initialContent?: any
  id?: string
}) => {
  const editorConfig = {
    editable: !readonly,
    editorState: initialContent,
    namespace: 'Myhtra Editor',
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, CodeNode, CodeHighlightNode, LinkNode, AutoLinkNode, ImageNode],
    onError(error: Error) {
      throw error
    },
    theme: LexicalStyles
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <ToolbarContext>
        <Editor onChange={onChange} readonly={readonly} id={id} />
      </ToolbarContext>
    </LexicalComposer>
  )
}

const Editor = ({ onChange, readonly, id }: { onChange?: any; readonly?: boolean; id?: string }) => {
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false)
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null)
  const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false)
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const isEditable = useLexicalEditable()
  const flexContainerRef = useRef<HTMLDivElement>(null)

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport = CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport)
      }
    }
    updateViewPortWidth()
    window.addEventListener('resize', updateViewPortWidth)

    return () => {
      window.removeEventListener('resize', updateViewPortWidth)
    }
  }, [isSmallWidthViewport])

  const getMaxWidth = () => {
    if (flexContainerRef.current) {
      // Subtracting to account for padding or other elements
      return flexContainerRef.current.offsetWidth - 16
    }
    return undefined
  }

  return (
    <FlexContainer ref={flexContainerRef} width="100%" borderWidth="m" borderRadius="m">
      <ConditionalDisplay condition={readonly == false}>
        <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} maxWidth={getMaxWidth()} />
      </ConditionalDisplay>
      <FlexContainer width="100%">
        <RichTextPlugin contentEditable={<Content ref={onRef} id={id} />} ErrorBoundary={LexicalErrorBoundary} />
        <ShortcutsPlugin editor={activeEditor} setIsLinkEditMode={setIsLinkEditMode} />
        <OnChangePlugin onChange={onChange} />
        <ClearEditorPlugin />
        <HistoryPlugin />
        <CodeHighlightPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <ListMaxIndentLevelPlugin maxDepth={7} />
        <LinkPlugin />
        <LexicalAutoLinkPlugin />
        <ConditionalDisplay condition={floatingAnchorElem != null && !isSmallWidthViewport}>
          <CodeActionMenuPlugin anchorElem={floatingAnchorElem || undefined} />
          <FloatingLinkEditorPlugin
            anchorElem={floatingAnchorElem || undefined}
            isLinkEditMode={isLinkEditMode}
            setIsLinkEditMode={setIsLinkEditMode}
          />
        </ConditionalDisplay>
        <ImagesPlugin captionsEnabled={false} />
        <ShortcutsPlugin editor={activeEditor} setIsLinkEditMode={setIsLinkEditMode} />
        {/* <AutoFocusPlugin /> */}
      </FlexContainer>
    </FlexContainer>
  )
}

type ContentRef = HTMLDivElement

interface ContentProps {
  id?: string
}

const Content = forwardRef<ContentRef, ContentProps>(({ id }, ref): ReactElement => {
  return (
    <FlexContainer position="relative" ref={ref} width="100%">
      <ContentEditable id={id} className={styles['editor-input']} />
    </FlexContainer>
  )
})

Content.displayName = 'Content'

export default Content
