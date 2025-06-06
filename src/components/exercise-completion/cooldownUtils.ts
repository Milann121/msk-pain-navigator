
import { COOLDOWN_SECONDS } from './constants';

export const calculateCooldownRemaining = (lastCompletedAt: Date): number => {
  const now = new Date();
  const timeDiffSeconds = (now.getTime() - lastCompletedAt.getTime()) / 1000;
  return Math.max(0, COOLDOWN_SECONDS - timeDiffSeconds);
};

export const isCooldownActive = (lastCompletedAt: Date | null): boolean => {
  if (!lastCompletedAt) return false;
  
  const cooldownRemaining = calculateCooldownRemaining(lastCompletedAt);
  return cooldownRemaining > 0;
};
