import styles from './Lexical.module.css'

export const LexicalStyles = {
  code: styles['editor-code'],
  heading: {
    h1: styles['editor-heading-h1'],
    h2: styles['editor-heading-h2'],
    h3: styles['editor-heading-h3'],
    h4: styles['editor-heading-h4'],
    h5: styles['editor-heading-h5'],
  },
  image: styles['editor-image'],
  link: styles['editor-link'],
  list: {
    listitem: styles['editor-listitem'],
    nested: {
      listitem: styles['editor-nested-listitem'],
    },
    ol: styles['editor-list-ol'],
    ul: styles['editor-list-ul'],
  },
  ltr: styles['ltr'],
  paragraph: styles['editor-paragraph'],
  placeholder: styles['editor-placeholder'],
  quote: styles['editor-quote'],
  rtl: styles['rtl'],
  text: {
    bold: styles['editor-text-bold'],
    code: styles['editor-text-code'],
    hashtag: styles['editor-text-hashtag'],
    italic: styles['editor-text-italic'],
    overflowed: styles['editor-text-overflowed'],
    strikethrough: styles['editor-text-strikethrough'],
    underline: styles['editor-text-underline'],
    underlineStrikethrough: styles['editor-text-underlineStrikethrough'],
  },
};
