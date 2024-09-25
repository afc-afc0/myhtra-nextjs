'use client'

import { FlexContainer } from "@components/ui/Layout/FlexContainer/FlexContainer"
import { useLexical } from "@components/ui/Lexical/react-rich/src/plugins/shared/useOnChange"
import { LexicalRichText } from "@components/ui/Lexical/react-rich/src/LexicalRichText"
import { Button } from "@components/ui/Button/Button"
import { PageContainer } from "@components/ui/PageContainer/PageContainer"
import { Input } from "@components/ui/Form/Input/Input"
import { Label } from "@components/ui/Form/Label/Label"
import { useState } from "react"

const api = process.env.NEXT_PUBLIC_MYHTRA_API

export default function Home() {
  const { lexicalContent, canSubmit, onChange } = useLexical()
  const [name, setName] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)
  const submitLexicalContent = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/Post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          content: lexicalContent  
        })
      })
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (  
    <PageContainer>
      <FlexContainer width='100%' alignItems='center' paddingSize='l'>
        <FlexContainer width='inherit' height='auto' borderRadius='m' borderWidth='s' paddingSize='s' gapSize='s'>
          <FlexContainer width='50%'>
            <Label label='Post name' htmlFor='inputText' />
            <Input id='inputText' value={name} onChange={e => setName(e.target.value)} /> 
          </FlexContainer>
          <FlexContainer width='100%'>
            <Label label='Post content' htmlFor='lexicalContent' />
            <LexicalRichText 
              onChange={onChange}
            />
          </FlexContainer>
          <FlexContainer width='100%' height='auto' alignItems='flex-end'>
            <Button
              onClick={submitLexicalContent} 
              disabled={!canSubmit || !name}
              loading={loading}
              text="Create Post"
              size='m'
            />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </PageContainer>
  )
}