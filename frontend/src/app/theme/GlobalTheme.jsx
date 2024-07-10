import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

// 전역 CSS 설정
const GlobalTheme = createGlobalStyle`
  ${reset}

  ${({ theme }) => `
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    body {
      width: 100%;
      min-height: 100vh;

      font-size: ${theme.fontSize.MD};
      font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui,
        Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
        "Noto Sans KR", "Malgun Gothic", sans-serif;
      line-height: 1.5;
      
      color: ${theme.colors.WHITE[100]};
      background-color: ${theme.colors.BLACK[200]};
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
  `}
`;

export default GlobalTheme;
