import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin'
import {LexicalComposer} from '@lexical/react/LexicalComposer'
import {ContentEditable} from '@lexical/react/LexicalContentEditable'
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary'
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin'
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin'
import TreeViewPlugin from './plugins/TreeViewPlugin'
import ToolbarPlugin from './plugins/ToolbarPlugin'

import styles from './Lexical.module.css'
import { LexicalStyles } from './LexicalStyles'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'

import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { ListNode, ListItemNode } from '@lexical/list'
import { CodeNode } from '@lexical/code'


const editorConfig = {
  namespace: 'Myhtra Editor',
  nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, CodeNode],
  onError(error: Error) {
    throw error
  },
  theme: LexicalStyles,
}

export function LexicalRichText() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <FlexContainer width='100%' borderWidth='m' borderRadius='m'>
        <ToolbarPlugin />
        <FlexContainer width='100%'>
          <RichTextPlugin
            contentEditable={<Content />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          {/* <AutoFocusPlugin /> */}
          {/* <TreeViewPlugin /> */}
        </FlexContainer>
      </FlexContainer>
    </LexicalComposer>
  )
}

const Content = () => {
  return (
    <FlexContainer width='100%'>
      <ContentEditable
        className={styles['editor-input']}
      />
    </FlexContainer>
  )
}
