'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '../ui/input';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../ui/button';

export const SigninForm = () => {
  const router = useRouter();
  const [emailField, setEmailField] = useState<string>('');
  const [passwordField, setPasswordField] = useState<string>('');

  const handleEnterButton = () => {
    router.replace('/home');
  };

  return (
    <>
      <Input
        placeholder='Digite o seu Gmail'
        value={emailField}
        onChange={t => setEmailField(t)}
      />

      <Input
        placeholder='Digite sua senha'
        value={passwordField}
        onChange={t => setPasswordField(t)}
        password
      />

      <Button label='Entrar' onClick={handleEnterButton} size={1} />
    </>
  );
};
