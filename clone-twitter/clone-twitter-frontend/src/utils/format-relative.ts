export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInMilliseconds = date.getTime() - now.getTime();

  type Unit = {
    unit: Intl.RelativeTimeFormatUnit;
    milliseconds: number;
  };

  const units: Unit[] = [
    { unit: 'year', milliseconds: 1000 * 60 * 60 * 24 * 365 },
    { unit: 'month', milliseconds: 1000 * 60 * 60 * 24 * 30 },
    { unit: 'week', milliseconds: 1000 * 60 * 60 * 24 * 7 },
    { unit: 'day', milliseconds: 1000 * 60 * 60 * 24 },
    { unit: 'hour', milliseconds: 1000 * 60 * 60 },
    { unit: 'minute', milliseconds: 1000 * 60 },
    { unit: 'second', milliseconds: 1000 },
  ];

  const rtf = new Intl.RelativeTimeFormat('pt', { numeric: 'auto' });

  for (const { unit, milliseconds } of units) {
    const amount = diffInMilliseconds / milliseconds;
    if (Math.abs(amount) >= 1) {
      return rtf.format(Math.round(amount), unit);
    }
  }

  return 'agora';
};
