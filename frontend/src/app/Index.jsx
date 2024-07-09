import { Outlet } from "react-router-dom";
import Header from "./header/Index";

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
