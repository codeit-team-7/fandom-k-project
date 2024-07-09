export const pxr = (px) => `${px}rem`;
export const em = (px) => `${px}em`;
export const px = (strings, ...values) => {
  return strings.reduce((acc, str, i) => {
    const value = values[i];
    if (!values.length) {
      if (typeof value === "number") {
        return acc + str + pxr(value);
      } else {
        return acc + str + value;
      }
    }
    return acc + str;
  });
};
