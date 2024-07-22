import { initialPageSize } from './utils';

export const queryInitializer = () => ({
  pageSize: initialPageSize(),
  cursorIndex: 0,
});

export const datasInitializer = () => ({
  datas: [],
  cursors: [0],
  renderPosition: 0,
});

export const queryReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const datasReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
