import Link from 'next/link'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text, TextType } from '@components/ui/Text/Text'
import { RichText } from '@components/ui/Text/RichText'
import { projects } from '../../_content/profile'
import { Card } from '../Card/Card'

export const Projects = () => {
  return (
    <FlexContainer width="100%" gapSize="s">
      <Text text="Projects" fontSize="l" fontWeight="bold" />
      {projects.map((p) => (
        <Card key={p.name}>
          <FlexContainer flexDirection="row" width="100%" justifyContent="space-between" alignItems="center">
            {p.href ? (
              <Link href={p.href} target="_blank" rel="noopener noreferrer">
                <Text text={`${p.name} ↗`} type={TextType.LINK} fontSize="l" fontWeight="medium" />
              </Link>
            ) : (
              <Text text={p.name} fontSize="l" fontWeight="medium" />
            )}
            <Text text={p.status} type={TextType.HIGHLIGHT} fontSize="s" fontWeight="medium" />
          </FlexContainer>
          <RichText text={p.summary} fontSize="s" />
        </Card>
      ))}
    </FlexContainer>
  )
}
