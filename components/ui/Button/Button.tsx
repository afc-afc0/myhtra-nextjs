import styles from './Button.module.css'

interface ButtonProps {
  label: string
  onClick?: () => void
  disabled?: boolean 
}

export const Button = ({ label, onClick, disabled = false } : ButtonProps) => {
  return (
    <button className={styles.button} disabled={disabled} onClick={onClick}>
      { label }
    </button>
  )
}

