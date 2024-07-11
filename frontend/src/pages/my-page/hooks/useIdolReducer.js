import { useCallback, useReducer } from "react";

const initialState = {
  idols: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        idols: action.payload,
      };
  }
};

export const useIdolReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setIdol = useCallback(
    (idols) => {
      dispatch({
        type: "SET",
        payload: idols,
      });
    },
    [dispatch]
  );

  return { idols: state, setIdol };
};
