import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@components/ui/Button/Button';

import styles from './LoginButton.module.css'

const keycloakSessionLogOut = async () => {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (err) {
    console.error(err);
  }
}

export const LoginButton = () => {
  const { data: session, status } = useSession()

  if (status === 'authenticated' && session.user) {
    return (
      <div className="my-3">
        Logged in as <span className="text-yellow-100">{session.user.email}</span>{" "}
        <Button
          onClick={() => {
            keycloakSessionLogOut().then(() => signOut({ callbackUrl: "/" }));
          }}
          text='Log out'
        />
      </div>
    )
  } else {
    return (
      <Button
        text='Log In'
        onClick={() => signIn("keycloak")}
        size='l'
        loading={status === 'loading'}
      />
    )
  }
}

// When signed in we want to show