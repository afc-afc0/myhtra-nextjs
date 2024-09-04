/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';

import styles from './Lexical.module.css'
import { LexicalStyles } from './LexicalStyles';

const placeholder = 'Enter some rich text...';

const editorConfig = {
  namespace: 'React.js Demo',
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  theme: LexicalStyles,
};

export function LexicalRichText() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={styles['editor-container']}>
        <ToolbarPlugin />
        <div className={styles['editor-inner']}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={styles['editor-input']}
                aria-placeholder={placeholder}
                placeholder={
                  <div className={styles["editor-placeholder"]}>{placeholder}</div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <TreeViewPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}
