// hooks/useUser.ts
'use client';
import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { following } from '../types/following';

export const useFollowing = () => {
  const [following, setFollowing] = useState<following[] | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/suggestions');
        const follow = res.data.users;

        setFollowing(follow);
      } catch {
        setFollowing(null);
      }
    };

    fetchUser();
  }, []);

  return following;
};
