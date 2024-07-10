import { useReducer } from "react";

const initialState = {
  idols: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        idols: [...state.idols, action.playload],
      };
    case "REMOVE":
      return {
        ...state,
        idols: state.idols.filter((idol) => idol.id !== action.playload),
      };
  }
};

export const useFavoriteIdols = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addIdol = (idol) => {
    dispatch({
      type: "ADD",
      payload: {
        id: state.idols.length,
        name: idol.name,
        group: idol.group,
      },
    });
  };

  const removeIdol = (idol) => {
    dispatch({
      type: "REMOVE",
      payload: idol.id,
    });
  };

  return { favorites: state, addIdol, removeIdol };
};
