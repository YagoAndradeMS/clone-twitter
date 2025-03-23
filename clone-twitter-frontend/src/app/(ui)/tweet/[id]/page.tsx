import { TweetItem } from '@/components/tweet/tweet-itm';
import { TweetPost } from '@/components/tweet/tweet-post';
import { GeneralHeader } from '@/components/ui/geberal-header';
import { tweet } from '@/data/tweet';

export default function page() {
  return (
    <div className=''>
      <GeneralHeader backHref='/home'>
        <div className='font-bold text-lg'>Voltar</div>
      </GeneralHeader>

      <div className='borer-t-2 border-gray-900'>
        <TweetItem tweet={tweet} />

        <div className='border-y-8 border-gray-900'>
          <TweetPost />
        </div>

        <TweetItem tweet={tweet} hideComments />
        <TweetItem tweet={tweet} hideComments />
        <TweetItem tweet={tweet} hideComments />
      </div>
    </div>
  );
}
