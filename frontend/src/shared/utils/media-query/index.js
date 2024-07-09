import { css } from "styled-components";
import { BREAKPOINTS } from "@app/theme";
import { pxe, px } from "@utils";

export const media = Object.keys(BREAKPOINTS).reduce((acc, label) => {
  return (
    (acc[label] = (...args) => css`
      @media (min-width: ${pxe(BREAKPOINTS[label])}) {
        ${px(...args)}
      }
    `),
    acc
  );
}, {});
