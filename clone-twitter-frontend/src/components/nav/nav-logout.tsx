'use client';
import {
  faArrowRightFromBracket,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

export const NavLogout = () => {
  const router = useRouter();
  const handleClick = () => {
    router.replace('/signin');
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-6 py-3 opacity-50 hover:opacity-100`}
    >
      <FontAwesomeIcon icon={faArrowRightFromBracket} className='size-6' />

      <div className='text-lg'>sair</div>
    </div>
  );
};
