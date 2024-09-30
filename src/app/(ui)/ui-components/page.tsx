'use client'

import { Input } from '@components/ui/Form/Input/Input'
import { Label } from '@components/ui/Form/Label/Label'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { ThemeSwitch } from '@components/ui/ThemeSwitch/ThemeSwitch'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/Form/Select/Select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/Accordion/Accordion'
import { LexicalRichText } from '@components/ui/Lexical/react-rich/src/LexicalRichText'
import { useLexical } from '@components/ui/Lexical/react-rich/src/plugins/shared/useOnChange'
import { Button } from '@components/ui/Button/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@components/ui/DropdownMenu/DropdownMenu'
import { ChevronRightSVG } from '@components/ui/SVG/SVG'
import { Text } from '@components/ui/Text/Text'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/Popover/Popover'
import { AuthController } from '@components/ui/Auth/AuthController/AuthController'
import { DialogHeader, DialogContent, Dialog, DialogTrigger, DialogFooter } from '@components/ui/Dialog/Dialog'

import styles from './page.module.css'
import { PageContainer } from '@components/ui/PageContainer/PageContainer'
import { Checkbox } from '@components/ui/Form/Checkbox/Checkbox'

export default function Home() {
  const [inputTextValue, setInputTextValue] = useState<string>('')
  const [selectValue, setSelectValue] = useState<string>('')

  return (
    <PageContainer>
      <FlexContainer width='100%' alignItems='center' paddingSize='l'>
        <Container> 
          <FlexContainer width='inherit' height='auto' borderRadius='m' borderWidth='m' paddingSize='s' gapSize='s'>          
            <FlexContainer width='100%' flexDirection='row' flexGrow={1} flexBasis='%0' gapSize='s'>
              <FlexContainer width='50%'>
                <Label label='Input text' htmlFor='inputText' />
                <Input id='inputText' value={inputTextValue} onChange={e => setInputTextValue(e.target.value)} /> 
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
            <ThemeSwitch />          
            <FlexContainer width='100%' height='auto'>
              <LexicalRichText />
            </FlexContainer>
            <FlexContainer width='100%' height='auto'>
              <Button
                text='Button'
              />
            </FlexContainer>
            <FlexContainer width='100%' height='auto' gapSize='s'>
              <Text text='Dialog' />
              <Dialog>
                <DialogTrigger asChild>
                  <Button text='Open Dialog' />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <Text text='Dialog Header' />
                  </DialogHeader>
                  <FlexContainer width='100%' gapSize='s'>
                    <Text text='Dialog Content' />
                    <Text text='Dialog Content' />
                    <Text text='Dialog Content' />
                    <Text text='Dialog Content' />
                  </FlexContainer>
                </DialogContent>
                <DialogFooter>
                  <Button text='Submit'>Save changes</Button>
                </DialogFooter>
              </Dialog>
            </FlexContainer>
            <FlexContainer width='100%' height='auto'>
              <Text text='Droddown Menu currently in testing' />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    icon={<ChevronRightSVG />}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Text text='Text' />
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <Text text='Sub Text' />
                      </DropdownMenuSubTrigger>
                      <DropdownMenuItem>
                        <Text text='Text' />
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Text text='Text' />
                      </DropdownMenuItem>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
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
            <FlexContainer width='100%' height='auto'>
              <Text text='Popover' />
              <Popover>
                <PopoverTrigger>
                  <Button text='Click me' />
                </PopoverTrigger>
                <PopoverContent>

                </PopoverContent>
              </Popover>
            </FlexContainer>
            <FlexContainer width='100%' height='auto'>
              <Text text='Auth Controller' />
              <AuthController />
            </FlexContainer>
            <FlexContainer width='100%' height='auto'>
              <Text text='Checkbox' />
              <Checkbox size='xs' />
            </FlexContainer>
          </FlexContainer>
        </Container>
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