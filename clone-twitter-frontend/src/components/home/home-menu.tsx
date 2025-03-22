import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Logo } from '../ui/logo';
import { faHouse, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { SearchInput } from '../ui/search-input';
import { NavItem } from '../nav/nav-item';
import { NavLogout } from '../nav/nav-logout';

type Props = {
  closeAction: () => void;
};

export const HomeMenu = ({ closeAction }: Props) => {
  return (
    <div className='fixed lg:hidden inset-0 p-6 bg-black'>
      <div className='flex justify-between items-center'>
        <Logo size={32} />

        <div
          onClick={closeAction}
          className='cursor-pointer flex justify-center items-center size-12 rounded-full border-2 border-gray-600'
        >
          <FontAwesomeIcon icon={faXmark} className='size-6' />
        </div>
      </div>

      <div className='my-6'>
        <SearchInput />
      </div>

      <nav className='mt-11'>
        <NavItem href='/home' icon={faHouse} label='Página inicial' />

        <NavItem href='/profile' icon={faUser} label='Meu perfil' />

        <NavLogout />
      </nav>
    </div>
  );
};
