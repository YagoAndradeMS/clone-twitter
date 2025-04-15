export const getImageUrl = (path: string) => {
  if (path.startsWith('http')) return path;
  return `/postForY/${path}`;
};

export const stripBaseUrl = (url: string) => {
  return url.replace(/^https?:\/\/localhost:3333\/?/, '');
};
