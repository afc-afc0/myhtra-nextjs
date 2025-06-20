'use client'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
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
import { forwardRef, ReactElement, useEffect, useState } from 'react'
import { ConditionalDisplay } from '@components/ui/ConditionalDisplay/ConditionalDisplay'
import { CAN_USE_DOM } from './plugins/shared/canUseDOM'
import { useLexicalEditable } from '@lexical/react/useLexicalEditable'

import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin/ListMaxIndentLevelPlugin'
import TreeViewPlugin from './plugins/TreeViewPlugin/TreeViewPlugin'
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
  initialContent = undefined
}: {
  onChange?: any
  readonly?: boolean
  initialContent?: any
}) => {
  const editorConfig = {
    namespace: 'Myhtra Editor',
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, CodeNode, CodeHighlightNode, LinkNode, AutoLinkNode, ImageNode],
    onError(error: Error) {
      throw error
    },
    theme: LexicalStyles,
    editorState: initialContent,
    editable: !readonly
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <ToolbarContext>
        <Editor onChange={onChange} readonly={readonly} />
      </ToolbarContext>
    </LexicalComposer>
  )
}

const Editor = ({ onChange, readonly }: { onChange?: any; readonly?: boolean }) => {
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false)
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null)
  const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false)
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const isEditable = useLexicalEditable()

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

  return (
    <FlexContainer width="100%" borderWidth="m" borderRadius="m">
      <ConditionalDisplay condition={readonly == false}>
        <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
      </ConditionalDisplay>
      <FlexContainer width="100%">
        <RichTextPlugin contentEditable={<Content ref={onRef} />} ErrorBoundary={LexicalErrorBoundary} />
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

interface ContentProps {}

const Content = forwardRef<ContentRef, ContentProps>((props, ref): ReactElement => {
  return (
    <FlexContainer position="relative" ref={ref} width="100%">
      <ContentEditable className={styles['editor-input']} />
    </FlexContainer>
  )
})

Content.displayName = 'Content'

export default Content
