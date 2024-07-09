import { ThemeProvider as OriginalThemProvider } from "styled-components";
import GlobalTheme from "./GlobalTheme";
import { theme } from "./theme";

export default function ThemeProvider({ children }) {
  return (
    <OriginalThemProvider theme={theme}>
      <GlobalTheme>{children}</GlobalTheme>
    </OriginalThemProvider>
  );
}
