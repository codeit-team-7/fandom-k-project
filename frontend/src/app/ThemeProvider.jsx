import { ThemeProvider as DefaultThemeProvider } from "styled-components";

import GlobalTheme from "./GlobalTheme";
import { theme } from "./theme";

// eslint-disable-next-line react/prop-types
export default function ThemeProvider({ children }) {
  return (
    <DefaultThemeProvider theme={theme}>
      <GlobalTheme />
      {children}
    </DefaultThemeProvider>
  );
}
