import { useCallback, useReducer } from "react";

const initialState = {
  contents: [],
  pageSize: 0,
};

const idolReducer = (state, action) => {
  const type = action.type;
  if (type === "SET") {
    return {
      ...state,
      contents: action.payload.contents,
      pageSize: action.payload.pageSize,
    };
  }

  return state;
};

export default function useIdolReducer() {
  const [state, dispatch] = useReducer(idolReducer, initialState);

  const setupState = useCallback(
    ({ data, pageSize }) =>
      dispatch({
        type: "SET",
        payload: {
          contents: data,
          pageSize: pageSize,
        },
      }),
    []
  );

  return { state, setupState };
}
