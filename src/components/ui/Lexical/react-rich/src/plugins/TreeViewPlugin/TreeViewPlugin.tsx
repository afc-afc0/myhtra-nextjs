/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { TreeView } from '@lexical/react/LexicalTreeView'

import styles from '../Lexical.module.css'
import { JSX } from 'react'

export default function TreeViewPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext()
  return (
    <TreeView
      viewClassName={styles['tree-view-output']}
      // treeTypeButtonClassName="debug-treetype-button"
      timeTravelPanelClassName={styles['debug-timetravel-panel']}
      timeTravelButtonClassName={styles['debug-timetravel-button']}
      timeTravelPanelSliderClassName={styles['debug-timetravel-panel-slider']}
      timeTravelPanelButtonClassName={styles['debug-timetravel-panel-button']}
      editor={editor}
    />
  )
}
