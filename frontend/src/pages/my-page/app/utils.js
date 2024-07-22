import { BREAKPOINTS } from '@app/theme';

export const getCurrentPageSize = width => {
  if (width <= BREAKPOINTS.MD) return 8;
  return 16;
};

export const getDeviceMode = width => {
  if (width <= BREAKPOINTS.SM) return 'mobile';
  if (width <= BREAKPOINTS.MD) return 'tablet';
  return 'desktop';
};

export const initialPageSize = () => {
  return getCurrentPageSize(window.innerWidth);
};

export const isTargetInArray = (array, target) => {
  if (!Number.isInteger(target)) return false;
  return array.includes(target);
};
