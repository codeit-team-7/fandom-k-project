import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./Index";
import ThemeProvider from "./ThemeProvider";
import { LandingPage, ListPage, MyPage } from "@pages";

export default function Router() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}>
            <Route index element={<LandingPage />} />
            <Route path="list" element={<ListPage />} />
            <Route path="mypage" element={<MyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
