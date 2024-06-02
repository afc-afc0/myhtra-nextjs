'use client'
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { ConditionalDisplay } from "@/components/ui/ConditionalDisplay/ConditionalDisplay"

import styles from './ThemeSwitch.module.css'

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const handleThemeSwitch = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (  
    <svg
      className={styles.icon}
      viewBox="0 -960 960 960"
      fill='currentColor'
      onClick={handleThemeSwitch}
    >
      <ConditionalDisplay condition={resolvedTheme === 'dark'}>
        <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82zm-10-270z" />
      </ConditionalDisplay>
      <ConditionalDisplay condition={resolvedTheme === 'light'}>
        <path d="M440-800v-120h80v120h-80zm0 760v-120h80v120h-80zm360-400v-80h120v80H800zm-760 0v-80h120v80H40zm708-252l-56-56 70-72 58 58-72 70zM198-140l-58-58 72-70 56 56-70 72zm564 0l-70-72 56-56 72 70-58 58zM212-692l-72-70 58-58 70 72-56 56zm268 452q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70zm0-80q67 0 113.5-46.5T640-480q0-67-46.5-113.5T480-640q-67 0-113.5 46.5T320-480q0 67 46.5 113.5T480-320zm0-160z" />
      </ConditionalDisplay>
    </svg>
  )
}