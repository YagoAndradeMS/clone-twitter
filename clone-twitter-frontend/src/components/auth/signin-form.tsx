'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '../ui/input';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export const SigninForm = () => {
  const router = useRouter();
  const [emailFiled, setEmailField] = useState<string>('');
  const [passwordFiled, setPasswordFiled] = useState<string>('');

  const handleEnterButton = () => {
    router.replace('/home');
  };

  return (
    <>
      <Input
        placeholder='Digite o seu Gmail'
        value={emailFiled}
        onChange={t => setEmailField(t)}
      />

      <Input
        placeholder='Digite sua senha'
        value={passwordFiled}
        onChange={t => setPasswordFiled(t)}
        password
      />

      <button onClick={handleEnterButton}>Entrar</button>
    </>
  );
};
