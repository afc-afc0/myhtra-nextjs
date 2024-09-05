'use client'
import { Input } from '@components/ui/Form/Input/Input'
import { Label } from '@components/ui/Form/Label/Label'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { PageContainer } from '@components/ui/PageContainer/PageContainer'
import { ThemeSwitch } from '@components/ui/ThemeSwitch/ThemeSwitch'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/Form/Select/Select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/Accordion/Accordion'
import { LexicalRichText } from '@components/ui/Lexical/react-rich/src/LexicalRichText'

import styles from './page.module.css'

export default function Home() {
  const [inputTextValue, setInputTextValue] = useState<string>('')
  const [selectValue, setSelectValue] = useState<string>('')

  return (
    <FlexContainer width='100%' alignItems='center' paddingSize='l'>
      <Container> 
        <FlexContainer width='inherit' height='auto' borderRadius='m' borderWidth='m' paddingSize='s' gapSize='s'>
        <ThemeSwitch /> 
          <FlexContainer width='100%' flexDirection='row' flexGrow={1} flexBasis='%0' gapSize='s'>
            <FlexContainer width='50%'>
              <Label label='Input text' htmlFor='inputText' />
              <Input id='inputText' value={inputTextValue} onChange={e => setInputTextValue(e.target.value)} /> 
            </FlexContainer>
            <FlexContainer width='50%'>
              <Label label='Select Component' htmlFor='select' />
              <Select onValueChange={value => setSelectValue(value)}>
                <SelectTrigger>
                  <SelectValue>{selectValue}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='1'>Option 1</SelectItem>
                  <SelectItem value='2'>Option 2</SelectItem>
                  <SelectItem value='3'>Option 3</SelectItem>
                </SelectContent>
              </Select>
            </FlexContainer>
          </FlexContainer>
          <FlexContainer width='100%' height='100%'>
            <Accordion type='single' collapsible> 
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if you
                  prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </FlexContainer>
          <FlexContainer width='100%' height='auto'>
            <LexicalRichText />
          </FlexContainer>
        </FlexContainer>
      </Container>
    </FlexContainer>
  )
}

const Container = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      { children }
    </div>
  )
}

const TwoColumnContainer = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.twoColumnContainer}>
      { children }
    </div>
  )
}