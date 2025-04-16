// hooks/useUser.ts
'use client';
import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { User } from '../types/user';
import { stripBaseUrl } from '../utils/getImage';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/user/:slug');

        const user: User = res.data.user;
        const userFilter = {
          ...user,
          avatar: stripBaseUrl(user.avatar),
          cover: stripBaseUrl(user.cover || ''),
        };
        setUser(userFilter);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return user;
};
