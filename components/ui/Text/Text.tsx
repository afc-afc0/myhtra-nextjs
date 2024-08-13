import clsx from 'clsx'
import styles from './Text.module.css'

export enum TextType {
  TEXT = 'text',
  LINK = 'link',
}

interface TextProps {
  text: string
  fontSize?: 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | 'xxxxl'
  fontWeight?: 'light' | 'normal' | 'medium' | 'bold' | 'black'
  fontColorTint?: '' | '90' | '80' | '70' | '60' | '50' | '40' | '30' | '20' | '10' | '5' | '2' | '1'
  type?: TextType
}

export const Text = ({ text, fontSize = 'm', fontWeight = 'medium', type = TextType.TEXT } : TextProps) => {
  return (
    <div className={clsx(styles.text)} data-size={fontSize} data-font-weight={fontWeight} data-type={type}>
      { text }
    </div>
  )
}