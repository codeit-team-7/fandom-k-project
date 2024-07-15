import { BREAKPOINTS } from "@app/theme";

export const calculatePageSize = (width) => {
  if (BREAKPOINTS.BASE <= width && width < BREAKPOINTS.SM) {
    return 8;
  } else if (BREAKPOINTS.MD <= width && width < BREAKPOINTS.XLG) {
    return 8;
  }
  return 16;
};
