import { Response } from 'express';
import { ExtendedRequest } from '../../types/extended-request';
import { addTweetSchema } from '../schemas/add-tweet';
import { createTweet, findTweet } from '../services/tweet.service';
import { addHashtag } from '../services/trend.service';

export const addTweet = async (req: ExtendedRequest, res: Response) => {
  // Validar os dados enviados
  const safeData = addTweetSchema.safeParse(req.body);
  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  // Verificar se e resposta
  if (safeData.data.answer) {
    const hasAnswerTweet = await findTweet(parseInt(safeData.data.answer));
    if (!hasAnswerTweet) {
      res.json({ error: 'Tweet original inexistente' });
      return;
    }
  }

  // Cria o tweet
  const newTweet = await createTweet(
    req.userSlug as string,
    safeData.data.body,
    safeData.data.answer ? parseInt(safeData.data.answer) : 0
  );

  // Adicionar a hashtag ao trend
  const hashtags = safeData.data.body.match(/#[a-zA-Z0-9_]+/g);
  if (hashtags) {
    for (let hashtag of hashtags) {
      if (hashtag.length >= 2) {
        await addHashtag(hashtag);
      }
    }
  }

  res.json({ tweet: newTweet });
};

export const getTweet = async (req: ExtendedRequest, res: Response) => {
  const { id } = req.params;

  const tweet = await findTweet(parseInt(id));
  if (!tweet) {
    res.json({ error: 'Tweet inexistente' });
    return;
  }

  res.json({ tweet });
};
