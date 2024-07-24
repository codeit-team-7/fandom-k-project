import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { initialPageSize } from './common/utils';
import { InfoContext, DataContext, FavoriteContext } from './common/contexts';

const infoInitializer = ({ cursor, pageSize } = {}) => ({
  pageSize: pageSize || initialPageSize(),
  cursors: cursor ? [0, cursor] : [0],
  cursorIndex: 0,
  renderIndex: 0,
  fetchTrigger: true,
  fetchUpdate: false,
});

const dataInitializer = ({ data }) => ({
  data: data ? [data] : [],
  loading: false,
  error: '',
});

const infoReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INSERT':
      return { ...infoInitializer({ cursor: action.payload }), fetchTrigger: false };
    case 'FETCH_RESIZE': {
      const resized = { ...infoInitializer({ pageSize: action.payload }), fetchTrigger: true };
      return { ...resized };
    }
    case 'FETCH_TRIGGER':
      return { ...state, fetchTrigger: true };
    case 'FETCH_TRIGGER_UPDATE':
      return { ...state, fetchTrigger: true, fetchUpdate: true };
    case 'FETCH_UPDATE':
      return {
        ...state,
        fetchTrigger: false,
        fetchUpdate: false,
        cursors: [...state.cursors, action.payload.nextCursor],
        cursorIndex: action.payload.cursorIndex,
        renderIndex: action.payload.renderIndex,
      };
    case 'FETCH_PREV':
      return {
        ...state,
        cursorIndex: state.cursorIndex - 1,
        renderIndex: state.renderIndex - 1,
      };
    case 'FETCH_NEXT':
      return {
        ...state,
        fetchTrigger: true,
        fetchUpdate: true,
      };
    case 'NAVIGATE_NEXT':
      return {
        ...state,
        cursorIndex: state.cursorIndex + 1,
        renderIndex: state.renderIndex + 1,
      };
    default:
      throw new Error('Invalid reducer type');
  }
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_LOADING':
      return { ...state, loading: true };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'FETCH_INSERT':
      return { ...dataInitializer({ data: action.payload }), loading: false, error: '' };
    case 'FETCH_UPDATE':
      return { data: [...state.data, action.payload], loading: false, error: '' };
    default:
      throw new Error('Invalid reducer type');
  }
};

export default function ReducerContext({ children }) {
  const [infoState, infoDispatch] = useReducer(infoReducer, {}, infoInitializer);
  const [dataState, dataDispatch] = useReducer(dataReducer, {}, dataInitializer);

  const infoContextValue = { state: infoState, dispatch: infoDispatch };
  const dataContextValue = { state: dataState, dispatch: dataDispatch };

  return (
    <InfoContext.Provider value={infoContextValue}>
      <DataContext.Provider value={dataContextValue}>{children}</DataContext.Provider>
    </InfoContext.Provider>
  );
}
