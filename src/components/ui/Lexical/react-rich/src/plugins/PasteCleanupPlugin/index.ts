import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { ListItemNode } from '@lexical/list'
import { mergeRegister } from '@lexical/utils'
import { $hasUpdateTag, ElementNode, Klass, ParagraphNode, PASTE_TAG, TextFormatType, TextNode } from 'lexical'
import { useEffect } from 'react'

// HTML copied from a rendered page carries that page's computed styles (a light code background,
// an uppercase heading, a fixed text colour). Lexical keeps them as inline styles and case formats,
// which override the editor theme, so pasted content drops them and takes the theme's look.
const CASE_FORMATS: TextFormatType[] = ['uppercase', 'lowercase', 'capitalize']
const BLOCK_NODES: Klass<ElementNode>[] = [ParagraphNode, HeadingNode, QuoteNode, ListItemNode]

export default function PasteCleanupPlugin(): null {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return mergeRegister(
      editor.registerNodeTransform(TextNode, (node) => {
        if (!$hasUpdateTag(PASTE_TAG)) {
          return
        }
        if (node.getStyle() !== '') {
          node.setStyle('')
        }
        for (const format of CASE_FORMATS) {
          if (node.hasFormat(format)) {
            node.toggleFormat(format)
          }
        }
      }),
      ...BLOCK_NODES.map((klass) =>
        editor.registerNodeTransform(klass, (node) => {
          if ($hasUpdateTag(PASTE_TAG) && node.getStyle() !== '') {
            node.setStyle('')
          }
        })
      )
    )
  }, [editor])

  return null
}
