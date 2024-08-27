'use client'
import { Input } from '@components/ui/Form/Input/Input'
import { Label } from '@components/ui/Form/Label/Label'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { PageContainer } from '@components/ui/PageContainer/PageContainer'
import { ThemeSwitch } from '@components/ui/ThemeSwitch/ThemeSwitch'
import { useState } from 'react'
import { LayoutContentContainer } from '@components/ui/Layout/LayoutContentContainer/LayoutContentContainer'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/Form/Select/Select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/Accordion/Accordion'

import styles from './page.module.css'

export default function Home() {
  const [inputTextValue, setInputTextValue] = useState<string>('')

  return (
    <PageContainer>
      <LayoutContentContainer>
        <Container>
          <FlexContainer>
            <Label label='Input text' htmlFor='inputText' />
            <Input id='inputText' value={inputTextValue} onChange={e => setInputTextValue(e.target.value)} /> 
          </FlexContainer>
          <FlexContainer>
            <Label label='Select Component' htmlFor='select' />
            <Select>
              <SelectTrigger>
                <SelectValue>Select</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='1'>Option 1</SelectItem>
                <SelectItem value='2'>Option 2</SelectItem>
                <SelectItem value='3'>Option 3</SelectItem>
              </SelectContent>
            </Select>
          </FlexContainer>
          <ThemeSwitch />
        </Container>
      </LayoutContentContainer>
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
    </PageContainer>
  )
}

const Container = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      { children }
    </div>
  )
}
