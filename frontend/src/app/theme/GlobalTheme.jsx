import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import { media } from "@utils";

// 전역 CSS 설정
const GlobalTheme = createGlobalStyle`
  ${reset}

  ${({ theme }) => `
    ${media.base`
      body {
        font-size: ${theme.fontSize.MD};
        color: ${theme.colors.WHITE[100]};
        background-color: ${theme.colors.BLACK[200]};
      }
    `}
  `}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
      "Noto Sans KR", "Malgun Gothic", sans-serif;
      line-height: 1.5;
    width: 100%;
    min-height: 100vh;
  }

  textarea,
    button,
    select,
    input {
      font: inherit;
    }

  img,
  picture {
    max-width: 100%;
    display: block;
  }

  button {
    padding: 0;
    border: 0;
    margin: 0;
  }
`;

export default GlobalTheme;
