import { EditorState, LexicalEditor } from 'lexical'
import { useCallback, useState } from 'react'
import { $isRootTextContentEmpty } from '@lexical/text'

export const useOnChange = (setContent: (text: string) => void, setCanSubmit: (canSubmit: boolean) => void) => {
  return useCallback(
    (editorState: EditorState, _editor: LexicalEditor) => {
      editorState.read(() => {
        setContent(JSON.stringify(editorState.toJSON()))
        setCanSubmit(!$isRootTextContentEmpty(_editor.isComposing(), true))
      })
    },
    [setCanSubmit, setContent]
  )
}

export const useLexical = () => {
  const [lexicalContent, setLexicalContent] = useState<string>('')
  const [canSubmit, setCanSubmit] = useState<boolean>(false)
  const onChange = useOnChange(setLexicalContent, setCanSubmit)

  return { canSubmit, lexicalContent, onChange }
}
