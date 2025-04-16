'use client';
import { ProfileFeed } from '../../../profile/profile-feed';
import { Button } from '../../../ui/button';
import { GeneralHeader } from '../../../ui/geberal-header';
import { useUser } from '../../../../hooks/useUser';
import { stripBaseUrl } from '../../../../utils/getImage';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect } from 'react';

export default function UserPage() {
  const user = useUser();
  const isMe = true;

  const isLoading = !user;

  useEffect(() => {
    if (user) {
      const cover = stripBaseUrl(user?.cover || '');

      const avatar = stripBaseUrl(user?.avatar || '');

      console.log(cover, avatar);
    }
  }, [user]);

  return (
    <div>
      <GeneralHeader backHref='/home'>
        {isLoading ? (
          <div className='flex flex-col gap-1 animate-pulse'>
            <div className='w-32 h-4 bg-gray-700 rounded'></div>
            <div className='w-16 h-3 bg-gray-700 rounded'></div>
          </div>
        ) : (
          <>
            <div className='font-bold text-lg'>{user.name}</div>
            <div className='text-xs text-gray-500'>{user.postCount} posts</div>
          </>
        )}
      </GeneralHeader>

      <section className='border-b-2 border-gray-900'>
        {isLoading ? (
          <div className='bg-gray-700 h-28 animate-pulse' />
        ) : (
          <div
            className='bg-gray-500 h-28 bg-no-repeat bg-cover bg-center'
            style={{
              backgroundImage: `url(/${stripBaseUrl(user.cover || '')})`,
            }}
          ></div>
        )}

        <div className='-mt-12 flex justify-between items-end px-6'>
          {isLoading ? (
            <div className='size-24 bg-gray-700 rounded-full animate-pulse' />
          ) : (
            <img
              src={stripBaseUrl(user.avatar)}
              alt={user.name}
              className='size-24 rounded-full'
            />
          )}

          <div className='w-32'>
            {isLoading ? (
              <div className='h-9 bg-gray-700 rounded-lg animate-pulse' />
            ) : isMe ? (
              <Link href={`/${user.slug}/edit`}>
                <Button label='Editar Perfil' size={2} />
              </Link>
            ) : (
              <Button label='Seguir' size={2} />
            )}
          </div>
        </div>

        <div className='px-6 mt-4'>
          {isLoading ? (
            <div className='space-y-3 animate-pulse'>
              <div className='w-48 h-5 bg-gray-700 rounded'></div>
              <div className='w-24 h-4 bg-gray-700 rounded'></div>
              <div className='h-4 w-full bg-gray-700 rounded'></div>
              <div className='h-4 w-1/2 bg-gray-700 rounded'></div>
              <div className='h-4 w-3/4 bg-gray-700 rounded'></div>
            </div>
          ) : (
            <>
              <div className='text-xl font-bold'>{user.name}</div>
              <div className='text-gray-500'>@{user.slug}</div>
              <div className='py-5 text-lg text-gray-500'>{user.bio}</div>
              {user.link && (
                <div className='flex gap-2 items-center'>
                  <FontAwesomeIcon icon={faLink} className='size-5' />
                  <Link
                    href={user.link}
                    target='_blank'
                    className='text-blue-300'
                  >
                    {user.link}
                  </Link>
                </div>
              )}
              <div className='my-5 flex gap-6'>
                <div className='text-xl text-gray-500'>
                  <span className='text-white'>99</span> Seguindo
                </div>
                <div className='text-xl text-gray-500'>
                  <span className='text-white'>99</span> Seguidores
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <ProfileFeed />
    </div>
  );
}
