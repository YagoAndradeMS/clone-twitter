// hooks/useUser.ts
'use client';
import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { User } from '../types/user';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/user');
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return user;
};
