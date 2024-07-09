import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "@pages/ListPage";
import MyPage from "@pages/MyPage";
import LandingPage from "@pages/LandingPage";
import App from "./App";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path="/list" element={<List />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
