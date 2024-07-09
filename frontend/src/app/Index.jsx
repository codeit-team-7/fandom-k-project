import { Outlet } from "react-router-dom";
import Header from "@app/header/Index";

export default function Index() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
