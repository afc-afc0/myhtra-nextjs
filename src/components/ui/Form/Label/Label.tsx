import * as LabelPrimative from '@radix-ui/react-label'

import styles from './Label.module.css'

interface LabelProps {
  label: string
  htmlFor?: string
}

export const Label = ({ label, htmlFor }: LabelProps) => {
  return (
    <LabelPrimative.Root className={styles.label} htmlFor={htmlFor}>
      {label}
    </LabelPrimative.Root>
  )
}
