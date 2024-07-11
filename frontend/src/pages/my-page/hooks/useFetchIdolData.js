import { useEffect } from "react";
import { useIdolReducer } from "./useIdolReducer";

const API_URL = import.meta.env.VITE_API_URL;
const REQUEST_URL = API_URL + "/idols";

export default function useFetchIdolData(pageSize) {
  const { idols, setIdol } = useIdolReducer();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${REQUEST_URL}?pageSize=${pageSize}`);
      const data = await response.json();
      setIdol(data);
    };

    fetchData();
  }, [setIdol, pageSize]);

  return idols;
}
