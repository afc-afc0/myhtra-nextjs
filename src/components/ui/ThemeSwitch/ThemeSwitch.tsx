'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/Popover/Popover'
import { Toggle } from '@components/ui/Toggle/Toggle'
import { DarkModeSVG } from '@components/ui/SVG/SVG'
import { Button } from '@components/ui/Button/Button'
import { FlexContainer } from '../Layout/FlexContainer/FlexContainer'

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Toggle 
          isPressed={isPopoverOpen}
          icon={<DarkModeSVG />}
          size='m'
          aria-label='Theme'
        />
      </PopoverTrigger>
      <PopoverContent>
        <FlexContainer flexDirection='column' gapSize='s'>
          <Button
            text='System'
            onClick={() => setTheme('system')}
            size='m'
          />
          <Button
            text='Dark'
            onClick={() => setTheme('dark')}
            size='m'
          />
          <Button
            text='Light'
            onClick={() => setTheme('light')}
            size='m'
          />
        </FlexContainer>
      </PopoverContent>
    </Popover>


    // <select value={theme} onChange={e => setTheme(e.target.value)}>
    //   <option value="system">System</option>
    //   <option value="dark">Dark</option>
    //   <option value="light">Light</option>
    // </select>
  )
}
