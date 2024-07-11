import { useCallback, useEffect, useState } from "react";
import { debounce } from "@utils";

export default function useWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  const changeWidth = useCallback(
    () =>
      debounce(() => {
        setWidth(window.innerWidth);
      }, 200)(),
    []
  );

  useEffect(() => {
    const handleResize = () => changeWidth();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [changeWidth]);

  return width;
}
