import {useEffect, useState} from 'react';

const formatTimeRemaining = (expiryDate: Date): string => {
  const now = new Date();
  const diffMs = expiryDate.getTime() - now.getTime();

  if (diffMs <= 0) return 'Expired';

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  const parts: string[] = [];

  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0 || parts.length === 0) parts.push(`${minutes}m`);

  if (diffMs < 5 * 60 * 1000) {
    parts.push(`${seconds}s`);
  }
  return `${parts.join(' ')} remaining`;
};

export const useTimeRemaining = (expiryDate: Date) => {
  const [formatted, setFormatted] = useState(() =>
    formatTimeRemaining(expiryDate),
  );
  const [diffMs, setDiffMs] = useState(
    () => expiryDate.getTime() - new Date().getTime(),
  );

  useEffect(() => {
    const updateTimeRemaining = () => {
      const now = new Date();
      const diffMs = expiryDate.getTime() - now.getTime();
      const newTimeRemaining = formatTimeRemaining(expiryDate);

      setDiffMs(diffMs);
      setFormatted(newTimeRemaining);

      return diffMs < 5 * 60 * 1000 ? 1000 : 10000;
    };
    let intervalMs = updateTimeRemaining();

    let interval = setInterval(() => {
      const newIntervalMs = updateTimeRemaining();

      if (newIntervalMs !== intervalMs) {
        clearInterval(interval);
        intervalMs = newIntervalMs;

        interval = setInterval(() => {
          intervalMs = updateTimeRemaining();
        }, intervalMs);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return {formatted, diffMs};
};
