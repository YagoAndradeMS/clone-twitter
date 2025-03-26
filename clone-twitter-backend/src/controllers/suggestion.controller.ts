import { Response } from 'express';
import { ExtendedRequest } from '../../types/extended-request';
import { getUserSuggestions } from '../services/user.service';

export const getSuggestion = async (req: ExtendedRequest, res: Response) => {
  const suggestions = await getUserSuggestions(req.userSlug as string);

  res.json({ users: suggestions });
};
