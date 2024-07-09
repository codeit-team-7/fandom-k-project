const BASE_PIXEL = 16;

export const pxr = (px) => `${px / BASE_PIXEL}rem`;

export const pxe = (px) => `${px / BASE_PIXEL}em`;

export const px = (strings, ...values) => {
  return strings.reduce((acc, str, i) => {
    const value = values[i];
    if (value) {
      if (typeof value === "number") {
        return acc + str + pxr(value);
      } else {
        return acc + str + value;
      }
    }
    return acc + str;
  }, "");
};
