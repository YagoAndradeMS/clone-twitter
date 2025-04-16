'use client';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { GeneralHeader } from '../../../../components/ui/geberal-header';
import { Input } from '../../../../components/ui/input';
import { TextArea } from '../../../../components/ui/textarea';
import { faCamera, faLink, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '../../../../hooks/useUser';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { api } from '../../../../utils/api';
import { checkApiError } from '../../../../utils/checkApiError';
import { toast } from 'sonner';

export default function Page() {
  const user = useUser();

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [link, setLink] = useState<string>('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setBio(user.bio || '');
      setLink(user.link || '');
    }
  }, [user]);

  const handleSave = async () => {
    try {
      console.log(name, bio, link);
      const response = await api.put('/user', {
        name,
        bio,
        link: link.trim() === '' ? undefined : link,
      });

      checkApiError(response);

      toast.success('Perfil atualizado com sucesso');
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar o perfil');
    }
  };

  if (!user) {
    return (
      <div>
        <GeneralHeader backHref='/home'>
          <div className='font-bold text-lg'>Editar perfil</div>
        </GeneralHeader>

        <section className='border-b-2 border-gray-900'>
          <div className='flex justify-center items-center gap-4 bg-gray-500 h-28'>
            <Skeleton height={48} width={48} circle />
            <Skeleton height={48} width={48} circle />
          </div>

          <div className='-mt-12 px-6'>
            <Skeleton height={96} width={96} circle />
          </div>
        </section>

        <section className='p-6 flex flex-col gap-4'>
          <label>
            <p className='text-lg text-gray-500 mb-2'>Nome</p>
            <Skeleton height={40} />
          </label>
          <label>
            <p className='text-lg text-gray-500 mb-2'>Bio</p>
            <Skeleton height={100} />
          </label>
          <label>
            <p className='text-lg text-gray-500 mb-2'>Link</p>
            <Skeleton height={40} />
          </label>
          <Skeleton height={40} width={160} />
        </section>
      </div>
    );
  }

  return (
    <div>
      <GeneralHeader backHref='/home'>
        <div className='font-bold text-lg'>Editar perfil</div>
      </GeneralHeader>

      <section className='border-b-2 border-gray-900'>
        <div
          className='flex justify-center items-center gap-4 bg-gray-500 h-28 bg-no-repeat bg-cover bg-center'
          style={{
            backgroundImage: `url(/${user.cover || ''})`,
          }}
        >
          <div className='cursor-pointer bg-black/80 flex justify-center items-center size-12 rounded-full'>
            <FontAwesomeIcon icon={faCamera} className='size-6' />
          </div>
          <div className='cursor-pointer bg-black/80 flex justify-center items-center size-12 rounded-full'>
            <FontAwesomeIcon icon={faXmark} className='size-6' />
          </div>
        </div>

        <div className='-mt-12 px-6'>
          <img
            src={user.avatar}
            alt={user.name}
            className='size-24 rounded-full'
          />
          <div className='-mt-24 size-24 flex justify-center items-center'>
            <div className='cursor-pointer bg-black/80 flex justify-center items-center size-12 rounded-full'>
              <FontAwesomeIcon icon={faCamera} className='size-6' />
            </div>
          </div>
        </div>
      </section>

      <section className='p-6 flex flex-col gap-4'>
        <label>
          <p className='text-lg text-gray-500 mb-2'>Nome</p>
          <Input
            placeholder='Digite Seu nome'
            value={name}
            onChange={e => setName(e)}
          />
        </label>
        <label>
          <p className='text-lg text-gray-500 mb-2'>Bio</p>
          <TextArea
            placeholder='Descreva você mesmo'
            rows={4}
            value={bio}
            onChange={e => setBio(e.target.value)}
          />
        </label>

        <label className='flex flex-col gap-4'>
          <p className='text-lg text-gray-500 mb-2'>Link</p>
          <Input
            placeholder='Digite um link'
            value={link || ''}
            onChange={e => setLink(e)}
          />
          <Button onClick={handleSave} label='Salvar alterações' size={1} />
        </label>
      </section>
    </div>
  );
}
