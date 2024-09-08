'use client'
import { DragHandleSVG } from '@components/ui/SVG/SVG';
import styles from './DraggableBlock.module.css';

import {DraggableBlockPlugin_EXPERIMENTAL} from '@lexical/react/LexicalDraggableBlockPlugin';
import {useRef} from 'react';

function isOnMenu(element: HTMLElement): boolean {
  return !!element.closest(`.${styles['draggable-block-menu']}`);
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
        <div ref={menuRef} className={styles['draggable-block-menu']}>
          <DragHandleSVG />
        </div>
      }
      targetLineComponent={
        <div ref={targetLineRef} className={styles['draggable-block-target-line']}/>
      }
      isOnMenu={isOnMenu}
    />
  );
}
