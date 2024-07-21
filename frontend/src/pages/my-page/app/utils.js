import { BREAKPOINTS } from '@app/theme';

export const getCurrentPageSize = width => {
  if (width < BREAKPOINTS.SM) return 6;
  if (width < BREAKPOINTS.LG) return 8;
  if (BREAKPOINTS.LG <= width) return 16;
};

export const initialPageSize = () => {
  return getCurrentPageSize(window.innerWidth);
};

export const isTargetInArray = (array, target) => {
  if (!Number.isInteger(target)) return false;
  return array.includes(target);
};
