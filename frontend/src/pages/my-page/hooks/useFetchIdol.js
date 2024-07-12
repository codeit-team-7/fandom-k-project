import { useEffect } from "react";
import useIdolReducer from "./useIdolReducer";

const API_URL = import.meta.env.VITE_API_URL;
const REQUEST_URL = `${API_URL}/idols`;

export default function useFetchIdol(pageSize) {
  const { state, setupState } = useIdolReducer(pageSize);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${REQUEST_URL}?pageSize=${pageSize}`);
      const data = await response.json();
      setupState({ data, pageSize });
    };

    fetchData();
  }, [pageSize, setupState]);

  return { state, setupState };
}
