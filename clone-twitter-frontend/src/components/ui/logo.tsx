import Image from 'next/image';
import Link from 'next/link';

interface Props {
  size: number;
}

export const Logo = ({ size }: Props) => {
  return (
    <Link href='/'>
      <Image
        src={'/logo.png'}
        alt='Y'
        width={size}
        height={size}
        quality={100}
      />
    </Link>
  );
};
