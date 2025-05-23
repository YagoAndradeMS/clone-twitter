'use client';
import Link from 'next/link';
import { Button } from './button';
import { useState } from 'react';
import { following } from '../../types/following';
import { stripBaseUrl } from '../../utils/getImage';
import { api } from '../../utils/api';

type Props = {
  user: following;
};

export const RecommendationItem = ({ user }: Props) => {
  const [followind, setFollowing] = useState(false);
  const handleFollowButton = async () => {
    try {
      const res = await api.post(`/user/${user.slug}/follow`);
      console.log(res);
    } catch (error) {}
    setFollowing(true);
  };

  return (
    <div className='flex items-center'>
      <div className='size-10 mr-2 rounded-full overflow-hidden'>
        <Link href={`/${user.slug}`}>
          <img
            src={stripBaseUrl(user.avatar)}
            alt={user.name}
            className='size-full'
          />
        </Link>
      </div>

      <div className='flex-1 overflow-hidden'>
        <Link href={`/${user.slug}`} className='block truncate'>
          {user.name}
        </Link>
        <div className='truncate text-sm'>@{user.slug}</div>
      </div>

      <div className='pl-2 w-20'>
        {!followind && (
          <Button label='Seguir' onClick={handleFollowButton} size={3} />
        )}
      </div>
    </div>
  );
};

export const RecommendationItemSkeleton = () => {
  return (
    <div className='animate-pulse flex items-center'>
      <div className='size-10 mr-2 rounded-full bg-gray-600'></div>
      <div className='flex-1 flex flex-col gap-1'>
        <div className='bg-gray-600 w-3/4 h-4'></div>
        <div className='bg-gray-600 w-1/4 h-4'></div>
      </div>
    </div>
  );
};
