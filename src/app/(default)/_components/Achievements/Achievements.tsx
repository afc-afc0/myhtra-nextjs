import { Card } from '@components/ui/Card/Card'
import { RichText } from '@components/ui/Text/RichText'
import { achievements } from '../../_content/profile'
import { Section } from '../Section/Section'

export const Achievements = () => {
  return (
    <Section title="Key achievements">
      <Card>
        {achievements.map((a) => (
          <RichText key={a} text={`▪ ${a}`} fontSize="s" />
        ))}
      </Card>
    </Section>
  )
}
