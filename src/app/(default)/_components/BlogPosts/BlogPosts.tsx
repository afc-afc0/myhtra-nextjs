'use client'

import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Posts } from '@components/ui/Posts/Posts'
import { Footer } from '@components/ui/Footer/Footer'
import { CreatePostDialog } from '@components/ui/Posts/CreatePostDialog/CreatePostDialog'

import styles from './BlogPosts.module.css'

export const BlogPosts = () => {
  return (
    <FlexContainer id='blogPosts' height='100%' alignItems='center' justifyContent='space-between' flexDirection='column'>
      <FlexContainer width='100%' flexGrow={1} justifyContent='center' alignItems='center'>
        <Container>
          <FlexContainer className={styles.overflow} paddingSize='s' borderWidth='l' borderRadius='m' height='inherit' width='inherit' flexDirection='column' gapSize='s' marginBottom='s' >
            <Posts />
          </FlexContainer>
          <FlexContainer justifyContent='flex-end' alignItems='flex-end'>
            <CreatePostDialog />
          </FlexContainer>
        </Container>
      </FlexContainer>
      <FlexContainer justifyContent='center' alignItems='center'>
        <Footer />
      </FlexContainer>     
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