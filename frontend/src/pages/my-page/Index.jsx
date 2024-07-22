import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';

import MyPage from './MyPage';
import usePrevious from './hooks/usePrevious';
import { QueryContext, DatasContext, FavoriteContext } from './app/contexts';
import { queryReducer, datasReducer, queryInitializer, datasInitializer } from './app/slice';

function MyPageContextProvider({ children }) {
  const [queryState, queryDispatch] = useReducer(queryReducer, {}, queryInitializer);
  const [datasState, datasDispatch] = useReducer(datasReducer, {}, datasInitializer);
  const [favoriteState, setFavoriteState] = useState([]);

  const queryPrevState = usePrevious(queryState);
  const datasPrevState = usePrevious(datasState);

  const initialFavoriteState = newStorage => setFavoriteState(newStorage);

  const updateFavoriteState = useCallback(
    newItem =>
      setFavoriteState(prevState => {
        const existingIndex = prevState.findIndex(item => item.id === newItem.id);
        if (existingIndex !== -1) {
          return prevState.filter((_, index) => index !== existingIndex);
        } else {
          return [...prevState, newItem];
        }
      }),
    [],
  );

  const deleteFavoriteState = useCallback(id => {
    setFavoriteState(prevState => {
      return prevState.filter(item => item.id !== id);
    });
  }, []);

  const queryContextValue = useMemo(
    () => ({
      state: queryState,
      dispatch: queryDispatch,
      prevState: queryPrevState,
    }),
    [queryPrevState, queryState],
  );

  const datasContextValue = useMemo(
    () => ({
      state: datasState,
      dispatch: datasDispatch,
      prevState: datasPrevState,
    }),
    [datasPrevState, datasState],
  );

  const favoriteContextValue = useMemo(
    () => ({
      state: favoriteState,
      update: updateFavoriteState,
      delete: deleteFavoriteState,
    }),
    [deleteFavoriteState, favoriteState, updateFavoriteState],
  );

  useEffect(() => {
    const storage = localStorage.getItem('my-page');
    if (storage) {
      const newStorage = JSON.parse(storage);
      initialFavoriteState(newStorage);
    }
  }, []);

  return (
    <QueryContext.Provider value={queryContextValue}>
      <DatasContext.Provider value={datasContextValue}>
        <FavoriteContext.Provider value={favoriteContextValue}>{children}</FavoriteContext.Provider>
      </DatasContext.Provider>
    </QueryContext.Provider>
  );
}

export default function Index() {
  return (
    <MyPageContextProvider>
      <MyPage />
    </MyPageContextProvider>
  );
}
