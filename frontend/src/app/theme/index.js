export const BREAKPOINTS = {
  BASE: 1,
  XSM: 320,
  SM: 425,
  MD: 728,
  LG: 1024,
};

// 컬러
export const COLORS = {
  BLACK: {
    200: "#02000e",
    100: "#181d26",
  },
  GRAY: {
    300: "#67666e",
    200: "#828282",
    100: "#A3A5A8",
  },
  WHITE: {
    100: "#f7f7f8",
    200: "8c92ab",
  },
  BRAND: {
    100: "#f96d69",
    200: "#fe5493",
  },
};

// 폰트 사이즈
export const FONT_SIZES = {
  "3xSM": 12,
  "2xSM": 13,
  "XSM": 14,
  "SM": 15,
  "MD": 16,
  "LG": 18,
  "XLG": 20,
  "2xLG": 26,
};

// 테마
export const theme = {
  ...BREAKPOINTS,
  ...COLORS,
  ...FONT_SIZES,
};
