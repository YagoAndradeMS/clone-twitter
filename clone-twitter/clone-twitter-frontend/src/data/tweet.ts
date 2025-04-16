import { Tweet } from '../types/tweet';
import { user } from './user';

export const tweet: Tweet = {
  id: 123,
  user: user,
  body: 'Outro dia Magico',
  image: '/postForY.png',
  likeCount: 4123,
  commentCount: 61,
  retweetCount: 0,
  liked: true,
  retweeted: false,
  dataPost: new Date(2024, 8, 1, 10, 0, 0),
};
