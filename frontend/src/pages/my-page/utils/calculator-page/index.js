import { BREAKPOINTS } from "@app/theme";

export const calculatePageSize = (width) => {
  return BREAKPOINTS.MD <= width && width < BREAKPOINTS.LG ? 8 : 16;
};
