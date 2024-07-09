import { Outlet } from "react-router-dom";
import Header from "@app/header/Index";
import media from "../shared/utils/media-query";

media.default`
  background: ${1};
`;

export default function Index() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
