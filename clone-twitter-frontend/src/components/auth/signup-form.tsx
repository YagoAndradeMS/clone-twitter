'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { api } from '@/utils/api';

export const SignupForm = () => {
  const router = useRouter();
  const [nameField, setNameField] = useState<string>('');
  const [emailField, setEmailField] = useState<string>('');
  const [passwordField, setPasswordField] = useState<string>('');

  const handleEnterButton = async () => {
    try {
      const response = await api.post('/auth/signup', {
        name: nameField,
        email: emailField,
        password: passwordField,
      });

      if (response.data.error) {
        console.error(response.data.error);
        return;
      }

      router.replace('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Input
        placeholder='Digite o seu Nome'
        value={nameField}
        onChange={e => setNameField(e)}
      />

      <Input
        placeholder='Digite o seu Gmail'
        value={emailField}
        onChange={e => setEmailField(e)}
      />

      <Input
        placeholder='Digite sua senha'
        value={passwordField}
        onChange={e => setPasswordField(e)}
        password
      />

      <Button label='Criar conta' onClick={handleEnterButton} size={1} />
    </>
  );
};
