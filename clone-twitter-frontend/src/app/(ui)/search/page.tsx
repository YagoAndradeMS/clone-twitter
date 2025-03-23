import { TweetItem } from '@/components/tweet/tweet-itm';
import { GeneralHeader } from '@/components/ui/geberal-header';
import { SearchInput } from '@/components/ui/search-input';
import { tweet } from '@/data/tweet';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: {
    q: string | undefined;
  };
};

export default function page({ searchParams }: Props) {
  if (!searchParams.q) redirect('/home');

  return (
    <div>
      <GeneralHeader backHref='/home'>
        <SearchInput defaultValue={searchParams.q} />
      </GeneralHeader>

      <div className='border-t-2 border-gray-900'>
        <TweetItem tweet={tweet} />
        <TweetItem tweet={tweet} />
        <TweetItem tweet={tweet} />
        <TweetItem tweet={tweet} />
        <TweetItem tweet={tweet} />
      </div>
    </div>
  );
}
