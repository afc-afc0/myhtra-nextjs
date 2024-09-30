'use client'

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@components/ui/Button/Button';
import { AvatarSVG } from '@components/ui/SVG/SVG';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/Popover/Popover';
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer';
import { Text } from '@components/ui/Text/Text';
import { Toggle } from '@components/ui/Toggle/Toggle';
import { useState } from 'react';

import styles from './AuthController.module.css'

export const keycloakSessionLogOut = async () => {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" })
  } catch (err) {
    console.error(err)
  }
}

export const AuthController = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return 
  } else if (status === 'authenticated') {
    return (
      <ProfilePopover />
    )
  } else {
    return (
      <Button
        text='Sign In/Up'
        onClick={() => signIn("keycloak")}
        size='m'
      />
    )
  }
}

export const ProfilePopover = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Toggle
          isPressed={isPopoverOpen}
          icon={<AvatarSVG />}
          size='m'
          aria-label='Profile'
        />
      </PopoverTrigger>
      <ProfilePopoverContent />
    </Popover>
  )
}

const ProfilePopoverContent = () => {
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await keycloakSessionLogOut()
    await signOut({ callbackUrl: "/" })
  }
  
  return (
    <PopoverContent>
      <FlexContainer width='auto' height='auto' gapSize='s'>
        <Text text={session?.user?.name || ''} />
        <Text text={session?.user?.email || ''} />
        <Button
          text='Log Out'
          onClick={handleSignOut}
        />
      </FlexContainer>
    </PopoverContent>
  )
}

const ProfilePopoverContainer = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className={styles.popoverContentContainer}>
      {children}
    </div>
  )
}

const ProfileImage = () => {
  return (
    <></>
  )
}