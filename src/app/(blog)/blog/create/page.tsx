'use client'

import { FlexContainer } from "@components/ui/Layout/FlexContainer/FlexContainer"
import { useLexical } from "@components/ui/Lexical/react-rich/src/plugins/shared/useOnChange"

import styles from './page.module.css'
import { LexicalRichText } from "@components/ui/Lexical/react-rich/src/LexicalRichText"
import { Button } from "@components/ui/Button/Button"

const api = process.env.NEXT_PUBLIC_MYHTRA_API

export default function Home() {
  const { lexicalContent, canSubmit, onChange } = useLexical()

  const submitLexicalContent = async () => {
    try {
      const response = await fetch(`${api}/Post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: lexicalContent  
        })
      })
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json()
    } catch (error) {
      console.error(error)
    }
  }

  return (  
    <FlexContainer width='100%' alignItems='center' paddingSize='l'>
      <Container>
        <FlexContainer width='inherit' height='auto' borderRadius='m' borderWidth='m' paddingSize='s' gapSize='s'>
          <LexicalRichText 
            onChange={onChange}
          />
          <FlexContainer width='100%' height='auto' alignItems='flex-end'>
            <Button 
              onClick={submitLexicalContent} 
              disabled={!canSubmit}
              text="Create Post"
              size='m'
            />
          </FlexContainer>
        </FlexContainer>
      </Container>      
    </FlexContainer>
  )
}

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}