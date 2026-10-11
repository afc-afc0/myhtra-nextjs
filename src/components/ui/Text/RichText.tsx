import { Text, TextType } from './Text'

interface RichTextProps {
  // Wrap important parts in **double asterisks** to make them bold and highlighted.
  text: string
  fontSize?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | 'xxxxl'
}

export const RichText = ({ text, fontSize = 'm' }: RichTextProps) => {
  return (
    <div>
      {text
        .split(/(\*\*[^*]+\*\*)/)
        .map((part, i) =>
          part.startsWith('**') ? (
            <Text key={i} text={part.slice(2, -2)} type={TextType.HIGHLIGHT} fontWeight="bold" fontSize={fontSize} display="inline" />
          ) : (
            part && <Text key={i} text={part} fontWeight="light" fontSize={fontSize} display="inline" />
          )
        )}
    </div>
  )
}
