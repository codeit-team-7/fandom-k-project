import { css } from "styled-components";
import { BREAKPOINTS } from "@app/theme";
import { pxe, px } from "@shared/utils/pxcel-calculator";

const media = (function () {
  return Object.keys(BREAKPOINTS).reduce((acc, label) => {
    return (
      (acc[label] = (...args) => css`
        @media (min-width: ${pxe(BREAKPOINTS[label])}) {
          ${px(...args)}
        }
      `),
      acc
    );
  }, {});
})();

export default media;
