'use client'
import styles from './DraggableBlock.module.css';

import {DraggableBlockPlugin_EXPERIMENTAL} from '@lexical/react/LexicalDraggableBlockPlugin';
import clsx from 'clsx';
import {useRef} from 'react';

const DRAGGABLE_BLOCK_MENU_CLASSNAME = styles['draggable-block-menu'];

function isOnMenu(element: HTMLElement): boolean {
  return !!element.closest(`.${DRAGGABLE_BLOCK_MENU_CLASSNAME}`);
}

export default function DraggableBlockPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement;
}): JSX.Element {
  const menuRef = useRef<HTMLDivElement>(null);
  const targetLineRef = useRef<HTMLDivElement>(null);

  return (
    <DraggableBlockPlugin_EXPERIMENTAL
      anchorElem={anchorElem}
      menuRef={menuRef}
      targetLineRef={targetLineRef}
      menuComponent={
        <div ref={menuRef} className={clsx(styles.icon, styles['draggable-block-menu'])}>
          <div className={styles.icon} />
        </div>
      }
      targetLineComponent={
        <div ref={targetLineRef} className={styles['draggable-block-target-line']}/>
      }
      isOnMenu={isOnMenu}
    />
  );
}
