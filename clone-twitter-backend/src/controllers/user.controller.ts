import { Response } from 'express';
import { ExtendedRequest } from '../../types/extended-request';
import {
  checkIfFollows,
  findUserBySlug,
  follow,
  getUserFollowersCount,
  getUserFollowingCount,
  getUserTweetCount,
  unfllow,
  updateUserInfo,
} from '../services/user.service';
import { userTweetsSchema } from '../schemas/user-tweets';
import { findTweetsByUser } from '../services/tweet.service';
import { updateUserSchema } from '../schemas/update-user';

export const getUser = async (req: ExtendedRequest, res: Response) => {
  const { slug } = req.params;

  const user = await findUserBySlug(slug);
  if (!user) {
    res.json({ error: 'Usuario inexistente' });
    return;
  }

  const followingCount = await getUserFollowingCount(user.slug);
  const followersCount = await getUserFollowersCount(user.slug);
  const tweetCount = await getUserTweetCount(user.slug);

  res.json({ user, followersCount, followingCount, tweetCount });
};

export const getUserTweets = async (req: ExtendedRequest, res: Response) => {
  const { slug } = req.params;

  // Validar os dados enviados
  const safeData = userTweetsSchema.safeParse(req.query);
  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  let perPage = 10;
  let currentPage = safeData.data.page ?? 0;

  const tweets = await findTweetsByUser(slug, currentPage, perPage);

  res.json({ tweets, page: currentPage });
};

export const followToogle = async (req: ExtendedRequest, res: Response) => {
  const { slug } = req.params;
  const user = req.userSlug as string;

  const hasUserToBeFollowed = await findUserBySlug(slug);
  if (!hasUserToBeFollowed) {
    res.json({ error: 'Usuario inexistenet' });
    return;
  }

  const follows = await checkIfFollows(user, slug);
  if (!follows) {
    await follow(user, slug);
    res.json({ follow: true });
  } else {
    await unfllow(user, slug);
    res.json({ follow: true });
  }
};

export const updateUser = async (req: ExtendedRequest, res: Response) => {
  // Validar os dados enviados
  const safeData = updateUserSchema.safeParse(req.body);
  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  await updateUserInfo(req.userSlug as string, safeData.data);

  res.json('Atualização executada com sucesso');
};
