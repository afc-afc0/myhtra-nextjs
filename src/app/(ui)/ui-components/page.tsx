'use client'

import { Input } from '@components/ui/Form/Input/Input'
import { Label } from '@components/ui/Form/Label/Label'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { ThemeSwitch } from '@components/ui/ThemeSwitch/ThemeSwitch'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/Form/Select/Select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/Accordion/Accordion'
import { LexicalRichText } from '@components/ui/Lexical/react-rich/src/LexicalRichText'
import { Button } from '@components/ui/Button/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@components/ui/DropdownMenu/DropdownMenu'
import { AuthSVG, CheckSVG, ChevronRightSVG } from '@components/ui/SVG/SVG'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/Tabs/Tabs'
import { Text } from '@components/ui/Text/Text'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/Popover/Popover'
import { AuthController } from '@components/ui/Auth/AuthController/AuthController'
import { DialogContent, Dialog, DialogTrigger, DialogFooter, DialogBody, DialogTitle } from '@components/ui/Dialog/Dialog'
import { signIn } from 'next-auth/react'
import { PageContainer } from '@components/ui/PageContainer/PageContainer'
import { Checkbox } from '@components/ui/Form/Checkbox/Checkbox'
import { useToast } from '@hooks/useToast'

import styles from './page.module.css'

export default function Home() {
  const [inputTextValue, setInputTextValue] = useState<string>('')
  const [selectValue, setSelectValue] = useState<string>('')
  const { toast } = useToast()

  return (
    <PageContainer>
      <FlexContainer width="100%" alignItems="center" paddingSize="l">
        <Container>
          <FlexContainer width="inherit" height="auto" paddingSize="s" gapSize="s">
            <ButtonSection />
            <FlexContainer width="100%" flexDirection="row" flexGrow={1} flexBasis="%0" gapSize="s">
              <FlexContainer width="50%">
                <Label label="Input text" htmlFor="inputText" />
                <Input id="inputText" value={inputTextValue} onChange={(e) => setInputTextValue(e.target.value)} />
              </FlexContainer>
            </FlexContainer>
            <FlexContainer width="100%" height="100%">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>Yes. It comes with default styles that matches the other components&apos; aesthetic.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>Yes. It&apos;s animated by default, but you can disable it if you prefer.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </FlexContainer>
            <ThemeSwitch />
            <FlexContainer width="100%" height="auto">
              <LexicalRichText />
            </FlexContainer>
            <FlexContainer width="100%" height="auto">
              <Button text="Button" />
            </FlexContainer>
            <FlexContainer width="100%" height="auto" gapSize="s">
              <Text text="Dialog" />
              <Dialog>
                <DialogTrigger asChild>
                  <Button text="Open Dialog" />
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogBody>
                    <Text text="Dialog Content" />
                    <Text text="Dialog Content" />
                    <Text text="Dialog Content" />
                    <Text text="Dialog Content" />
                  </DialogBody>
                  <DialogFooter>
                    <Button text="Submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </FlexContainer>
            <FlexContainer width="100%" height="auto">
              <Text text="Droddown Menu currently in testing" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button icon={<ChevronRightSVG />} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Text text="Text" />
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <Text text="Sub Text" />
                      </DropdownMenuSubTrigger>
                      <DropdownMenuItem>
                        <Text text="Text" />
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Text text="Text" />
                      </DropdownMenuItem>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </FlexContainer>
            <FlexContainer width="50%">
              <Label label="Select Component" htmlFor="select" />
              <Select onValueChange={(value) => setSelectValue(value)}>
                <SelectTrigger>
                  <SelectValue>{selectValue}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                  <SelectItem value="3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </FlexContainer>
            <FlexContainer width="100%" height="auto">
              <Text text="Popover" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button text="Click me" />
                </PopoverTrigger>
                <PopoverContent></PopoverContent>
              </Popover>
            </FlexContainer>
            <FlexContainer width="100%" height="auto">
              <Text text="Auth Controller" />
              <AuthController />
            </FlexContainer>
            <FlexContainer width="100%" height="auto">
              <Text text="Checkbox" />
              <Checkbox size="xs" />
            </FlexContainer>
            <FlexContainer width="100%" height="auto">
              <Button
                text="Toast"
                onClick={() =>
                  toast({
                    action: <Button onClick={() => signIn('keycloak')} />,
                    description: <Text text="description" />,
                    title: <Text text="Please sign in to create post" fontSize="xl" />
                  })
                }
              />
            </FlexContainer>
            <FlexContainer width="100%" height="auto">
              <Tabs defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" defaultChecked>
                  <SectionLabelContainer text="Tab 1 Content" />
                  <FlexContainer width="100%" height="auto" paddingSize="s">
                    <Text text="This is the content of Tab 1." />
                  </FlexContainer>
                </TabsContent>
                <TabsContent value="tab2">
                  <SectionLabelContainer text="Tab 2 Content" />
                  <FlexContainer width="100%" height="auto" paddingSize="s">
                    <Text text="This is the content of Tab 2." />
                  </FlexContainer>
                </TabsContent>
                <TabsContent value="tab3">
                  <SectionLabelContainer text="Tab 3 Content" />
                  <FlexContainer width="100%" height="auto" paddingSize="s">
                    <Text text="This is the content of Tab 3." />
                  </FlexContainer>
                </TabsContent>
              </Tabs>
            </FlexContainer>
          </FlexContainer>
        </Container>
      </FlexContainer>
    </PageContainer>
  )
}

const ButtonSection = () => {
  return (
    <SectionContainer>
      <Text fontSize="m" text="Button" />
      <FlexContainer flexDirection="row" width="100%" height="auto" gapSize="s">
        <FlexContainer width="50%" gapSize="s" flexDirection="column" borderRadius="s" theme="dark" paddingSize="s">
          <FlexContainer width="100%" gapSize="s" flexDirection="row" borderRadius="s">
            <Text fontSize="s" text="Text" />
            <Button text="Click Me" />
            <Button text="Click Me" loading />
            <Button text="Click Me" disabled />
          </FlexContainer>
          <FlexContainer width="100%" gapSize="s" flexDirection="row" borderRadius="s">
            <Text fontSize="s" text="Icon" />
            <Button icon={<CheckSVG />} />
            <Button icon={<CheckSVG />} loading />
            <Button icon={<CheckSVG />} disabled />
          </FlexContainer>
          <FlexContainer width="100%" gapSize="s" flexDirection="row" borderRadius="s">
            <Text fontSize="s" text="Icon + Text" />
            <Button icon={<AuthSVG />} text="Text" />
            <Button icon={<AuthSVG />} text="Text" loading />
            <Button icon={<AuthSVG />} text="Text" disabled />
          </FlexContainer>
          <FlexContainer width="100%" gapSize="s" flexDirection="row" borderRadius="s">
            <Text fontSize="s" text="Size" />
            <Button size="xs" icon={<AuthSVG />} text="Text" />
            <Button size="s" icon={<AuthSVG />} text="Text" />
            <Button size="m" icon={<AuthSVG />} text="Text" />
            <Button size="l" icon={<AuthSVG />} text="Text" />
            <Button size="xl" icon={<AuthSVG />} text="Text" />
          </FlexContainer>
        </FlexContainer>
        <FlexContainer width="50%" gapSize="s" flexDirection="row" borderRadius="s" theme="light">
          <Button text="Click Me" />
          <Button text="Click Me" loading />
          <Button text="Click Me" disabled />
          <Button icon={<CheckSVG />} />
          <Button icon={<CheckSVG />} disabled />
          <Button icon={<CheckSVG />} loading />
        </FlexContainer>
      </FlexContainer>
    </SectionContainer>
  )
}

const SectionLabelContainer = ({ text }: { text: string }) => {
  return (
    <FlexContainer width="100%" height="auto" paddingSize="s" borderRadius="s" backgroundColor="transparent">
      <Text text={text} fontSize="m" />
    </FlexContainer>
  )
}

const SectionContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <FlexContainer flexDirection="column" width="100%" height="auto" borderRadius="m" borderWidth="m" paddingSize="s" gapSize="s">
      {children}
    </FlexContainer>
  )
}

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>
}
