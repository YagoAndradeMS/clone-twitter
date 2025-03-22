'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '../ui/input';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../ui/button';

export const SignupForm = () => {
  const router = useRouter();
  const [nameField, setNameField] = useState<string>('');
  const [emailField, setEmailField] = useState<string>('');
  const [passwordField, setPasswordField] = useState<string>('');

  const handleEnterButton = () => {
    router.replace('/home');
  };

  return (
    <>
      <Input
        placeholder='Digite o seu Nome'
        value={nameField}
        onChange={t => setNameField(t)}
      />

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

      <Button label='Criar conta' onClick={handleEnterButton} size={1} />
    </>
  );
};
