import { useReducer } from 'react';
import { fetchIdols } from '../../api';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INSERT_SUCCESS': {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export const useMyPageStorageReducer = () => {
  const [store, dispatch] = useReducer(reducer, [], fetchIdols);

  const chooseAnIdol = newItem => {
    const exists = store.findIndex(item => item.id === newItem.id);
    dispatch({
      type: 'INSERT_SUCCESS',
      payload:
        exists !== -1
          ? store.filter((_, index) => index !== exists)
          : [...store, newItem],
    });
  };

  return { store, fetchIdols, chooseAnIdol };
};
