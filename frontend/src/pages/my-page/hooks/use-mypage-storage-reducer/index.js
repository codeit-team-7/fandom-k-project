import { useState } from "react";

export const useMyPageStorageReducer = () => {
  const [store, setStore] = useState([]);

  const chooseAnIdol = (newItem) => {
    const exists = store.findIndex((item) => item.id === newItem.id);
    {
      exists !== -1
        ? setStore((prevState) =>
            prevState.filter((_, index) => index !== exists)
          )
        : setStore((prevState) => [...prevState, newItem]);
    }
  };

  return { store, chooseAnIdol };
};
