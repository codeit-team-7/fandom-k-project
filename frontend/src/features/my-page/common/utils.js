import { BREAKPOINTS } from '@app/theme';

// 'BASE': 1,
// 'XSM': 320,
// 'SM': 425,
// 'MD': 768,
// 'LG': 1024,
// 'XLG': 1440,
// '2xLG': 1920,
export const currentPageSize = width => {
  if (width <= BREAKPOINTS.SM) return 12;
  if (width <= BREAKPOINTS.MD) return 8;
  return 16;
};

export const initialPageSize = () => {
  return currentPageSize(window.innerWidth);
};
