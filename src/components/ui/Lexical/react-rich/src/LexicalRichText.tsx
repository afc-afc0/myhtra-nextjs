'use client'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'

import { LexicalStyles } from './LexicalStyles'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { ListNode, ListItemNode } from '@lexical/list'
import { CodeNode, CodeHighlightNode } from '@lexical/code'
import { forwardRef, ReactElement, useEffect, useState } from 'react'
import { ConditionalDisplay } from '@components/ui/ConditionalDisplay/ConditionalDisplay'
import { CAN_USE_DOM } from './plugins/shared/canUseDOM'
import { useLexicalEditable } from '@lexical/react/useLexicalEditable';

import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin/ListMaxIndentLevelPlugin'
import TreeViewPlugin from './plugins/TreeViewPlugin/TreeViewPlugin'
import ToolbarPlugin from './plugins/ToolbarPlugin/ToolbarPlugin'
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin'
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin/DraggableBlockPlugin'

import styles from './Lexical.module.css'

const editorConfig = {
  namespace: 'Myhtra Editor',
  nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, CodeNode, CodeHighlightNode],
  onError(error: Error) {
    throw error
  },
  theme: LexicalStyles,
}

export function LexicalRichText() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <Editor />
    </LexicalComposer>
  )
}

const Editor = () => {
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false);
  const isEditable = useLexicalEditable();
  
  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener('resize', updateViewPortWidth);

    return () => {
      window.removeEventListener('resize', updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  return (
    <FlexContainer width='100%' borderWidth='m' borderRadius='m'>
      <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
      <FlexContainer width='100%'>
        <RichTextPlugin
          contentEditable={<Content ref={onRef} />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <CodeHighlightPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <ListMaxIndentLevelPlugin maxDepth={7} />
        <ConditionalDisplay condition={floatingAnchorElem != null && !isSmallWidthViewport}>
          <DraggableBlockPlugin anchorElem={floatingAnchorElem || undefined} />
        </ConditionalDisplay>
        {/* <AutoFocusPlugin /> */}
        {/* <TreeViewPlugin /> */}
      </FlexContainer>
    </FlexContainer>
  )
}

type ContentRef = HTMLDivElement; 

interface ContentProps {}

const Content = forwardRef<ContentRef, ContentProps>((props, ref): ReactElement => {
  return (
    <FlexContainer ref={ref} width='100%'>
      <ContentEditable
        className={styles['editor-input']}
      />
    </FlexContainer>
  );
});

Content.displayName = 'Content'; // This helps with debugging

export default Content;
