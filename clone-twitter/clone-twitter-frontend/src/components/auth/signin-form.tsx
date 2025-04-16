'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { api } from '../../utils/api';
import { checkApiError } from '../../utils/checkApiError';
import { toast } from 'sonner';

export const SigninForm = () => {
  const router = useRouter();
  const [emailField, setEmailField] = useState<string>('');
  const [passwordField, setPasswordField] = useState<string>('');

  const handleEnterButton = async () => {
    try {
      const response = await api.post('/auth/signin', {
        email: emailField,
        password: passwordField,
      });
      checkApiError(response);
      console.log(response);
      router.replace('/home');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao fazer login ' + error);
    }
  };
  // Yasashii27!  yago@gmail.com
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
