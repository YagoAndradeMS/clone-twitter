'use client';
import { useUser } from '../../../hooks/useUser';
import { redirect } from 'next/navigation';

export default function Page() {
  const user = useUser();
  if (!user) {
    return <div></div>;
  }
  redirect('/' + user.slug);
}
