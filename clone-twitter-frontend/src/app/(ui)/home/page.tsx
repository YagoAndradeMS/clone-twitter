import { HomeFeed } from '@/components/home/home-feed';
import { HomeHeader } from '@/components/home/home-header';
import { TweetPort } from '@/components/tweet/tweet-post';

export default function Page() {
  return (
    <div>
      <HomeHeader />
      <TweetPort />
      <HomeFeed />
    </div>
  );
}
