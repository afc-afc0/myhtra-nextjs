import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {mergeRegister} from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import {useCallback, useEffect, useRef, useState} from 'react';

import styles from '../Lexical.module.css';

import clsx from 'clsx';
import { Button } from '@components/ui/Button/Button';
import { BoldSVG, ItalicSVG, RedoSVG, StrikeThroughSVG, TextAlignCenterSVG, TextAlignJustifySVG, TextAlignLeftSVG, TextAlignRightSVG, UnderlineSVG, UndoSVG } from '@components/ui/SVG/SVG';
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer';
import { Toggle } from '@components/ui/Toggle/Toggle';

const LowPriority = 1;

function Divider() {
  return <div className={styles['divider']} />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, $updateToolbar]);

  return (
    <FlexContainer flexDirection='row' paddingSize='xs' borderRadius='s' borderWidth='s' ref={toolbarRef} gapSize='xs'>
      <Button
        icon={<UndoSVG />}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        disabled={!canUndo}
        aria-label={'Undo'}
        size='xs'
      />
      <Button
        icon={<RedoSVG />}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        disabled={!canRedo}
        aria-label={'Redo'}
        size='xs'
      />
      <Divider />
      <Toggle
        icon={<BoldSVG />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        isPressed={isBold}
        aria-label={'Bold'}
        size='xs'
      />
      <Toggle
        icon={<ItalicSVG />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        isPressed={isItalic}
        aria-label={'Italic'}
        size='xs'
      />
      <Toggle
        icon={<UnderlineSVG />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
        isPressed={isUnderline}
        aria-label={'Underline'}
        size='xs'
      />
      <Toggle
        icon={<StrikeThroughSVG />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
        isPressed={isStrikethrough}
        aria-label={'Strikethrough'}
        size='xs'
      />
      <Divider />
      <Button
        icon={<TextAlignLeftSVG />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}
        aria-label="Left Align"
        size='xs'
      />
      <Button
        icon={<TextAlignCenterSVG />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}
        aria-label="Center Align"
        size='xs'
      />
      <Button
        icon={<TextAlignRightSVG />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}
        aria-label="Right Align"  
        size='xs'
      />
      <Button
        icon={<TextAlignJustifySVG />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
        }}
        aria-label="Justify Align"
        size='xs'
      />
    </FlexContainer>
  );
}