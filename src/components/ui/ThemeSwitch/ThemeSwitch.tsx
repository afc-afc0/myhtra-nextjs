'use client'
import { useTheme } from 'next-themes'

import styles from './ThemeSwitch.module.css'

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()
  
  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div>
      Current Theme: { theme }
      <input type='checkbox' onClick={handleThemeChange} />
    </div>
  )
}