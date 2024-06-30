import sharedStyles from '../Shared/Shared.module.css'
import styles from './Input.module.css'

interface InputTextProps {
  value: string,
  id: string,
  autoComplete?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export const Input = ({ id, value, autoComplete = 'off', onChange }: InputTextProps) => {
  return (
    <input id={id} className={`${styles.input}  ${sharedStyles.shared}`} autoComplete={autoComplete} value={value} onChange={onChange} />
  )
}