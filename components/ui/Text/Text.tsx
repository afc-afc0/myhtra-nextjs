import styles from './Text.module.css'

interface TextProps {
  text: string
  fontSize?: 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | 'xxxxl'
  fontWeight?: 'light' | 'normal' | 'medium' | 'bold' | 'black'
  fontColorTint?: '' | '90' | '80' | '70' | '60' | '50' | '40' | '30' | '20' | '10' | '5' | '2' | '1'
}

export const Text = ({ text, fontSize = 'm', fontWeight = 'medium' } : TextProps) => {
  return (
    <div className={styles.text} data-size={fontSize} data-font-weight={fontWeight}>
      { text }
    </div>
  )
}