import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {mergeRegister} from '@lexical/utils';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import {useCallback, useEffect, useRef, useState} from 'react';

import styles from '../Lexical.module.css';

import clsx from 'clsx';
import { Button } from '@components/ui/Button/Button';
import { BoldSVG, ItalicSVG, RedoSVG, StrikeThroughSVG, TextAlignCenterSVG, TextAlignJustifySVG, TextAlignLeftSVG, TextAlignRightSVG, UnderlineSVG, UndoSVG } from '@components/ui/SVG/SVG';
import { Toggle } from '@components/ui/Toggle/Toggle';
import { $setBlocksType } from '@lexical/selection';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text'
import { INSERT_CHECK_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { $createCodeNode } from '@lexical/code';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/Form/Select/Select';

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
    <Container>
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
      <BlockFormatDropDown
        editor={editor}
        blockType={'paragraph'}
        rootType={'root'}
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
    </Container>
  )
}

const Container = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.toolbarContainer}>
      {children}
    </div>
  )
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
  quote: { label: 'Quote', value: 'quote' },
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
  [blockTypes.quote.value]: blockTypes.quote.label,
};

const rootTypeToRootName = {
  root: 'Root',
  table: 'Table',
}

export type HeadingTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const BlockFormatDropDown =({
  editor,
  blockType,
  rootType,
  disabled = false,
}: {
  blockType: keyof typeof blockTypeToBlockName;
  rootType: keyof typeof rootTypeToRootName;
  editor: LexicalEditor;
  disabled?: boolean;
}) =>{
  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  }

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      });
    }
  }

  const formatBulletList = () => {
    if (blockType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  }

  const formatCheckList = () => {
    if (blockType !== 'check') {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  }

  const formatNumberedList = () => {
    if (blockType !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  }

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createQuoteNode());
      });
    }
  }

  const formatCode = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        let selection = $getSelection();

        if (selection !== null) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection = $getSelection();
            if ($isRangeSelection(selection)) {
              selection.insertRawText(textContent);
            }
          }
        }
      });
    }
  };

  const handleBlockTypeChange = ({ value }: { value: string }) => {
    switch (value) {
      case blockTypes.paragraph.value:
        formatParagraph();
        break;
      case blockTypes.h1.value:
        formatHeading('h1');
        break;
      case blockTypes.h2.value:
        formatHeading('h2');
        break;
      case blockTypes.h3.value:
        formatHeading('h3');
        break;
      case blockTypes.bullet.value:
        formatBulletList();
        break;
      case blockTypes.check.value:
        formatCheckList();
        break;
      case blockTypes.number.value:
        formatNumberedList();
        break;
      case blockTypes.quote.value:
        formatQuote();
        break;
      case blockTypes.code.value:
        formatCode();
        break;
    }
  }

  return (
    <Select onValueChange={(value) => handleBlockTypeChange({ value })}>
      <SelectTrigger disabled={disabled}>
        <SelectValue>{blockType}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={blockTypes.paragraph.value}>{blockTypes.paragraph.label}</SelectItem>
        <SelectItem value={blockTypes.h1.value}>{blockTypes.h1.label}</SelectItem>
        <SelectItem value={blockTypes.h2.value}>{blockTypes.h2.label}</SelectItem>
        <SelectItem value={blockTypes.h3.value}>{blockTypes.h3.label}</SelectItem>
        <SelectItem value={blockTypes.bullet.value}>{blockTypes.bullet.label}</SelectItem>  
        <SelectItem value={blockTypes.check.value}>{blockTypes.check.label}</SelectItem>
        <SelectItem value={blockTypes.number.value}>{blockTypes.number.label}</SelectItem>
        <SelectItem value={blockTypes.quote.value}>{blockTypes.quote.label}</SelectItem>
        <SelectItem value={blockTypes.code.value}>{blockTypes.code.label}</SelectItem>
      </SelectContent>
    </Select>
  )
}

