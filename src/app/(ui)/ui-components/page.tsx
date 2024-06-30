'use client'
import { Input } from '@/components/ui/Form/Input/Input'
import { Label } from '@/components/ui/Form/Label/Label'
import { FlexContainer } from '@/components/ui/Layout/FlexContainer/FlexContainer'
import { PageContainer } from '@/components/ui/PageContainer/PageContainer'
import { ThemeSwitch } from '@/components/ui/ThemeSwitch/ThemeSwitch'
import { useState } from 'react'
import { LayoutContentContainer } from '@/components/ui/Layout/LayoutContentContainer/LayoutContentContainer'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Form/Select/Select'

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
    </PageContainer>
  )
}

export const Container = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      { children }
    </div>
  )
}
