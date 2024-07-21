import { useMemo, useReducer } from 'react';

import MyPage from './MyPage';
import usePrevious from './hooks/usePrevious';
import { QueryContext, DatasContext } from './app/contexts';
import { queryReducer, datasReducer, queryInitializer, datasInitializer } from './app/slice';

function MyPageContextProvider({ children }) {
  const [queryState, queryDispatch] = useReducer(queryReducer, {}, queryInitializer);
  const [datasState, datasDispatch] = useReducer(datasReducer, {}, datasInitializer);

  const queryPrevState = usePrevious(queryState);
  const datasPrevState = usePrevious(datasState);

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

  return (
    <QueryContext.Provider value={queryContextValue}>
      <DatasContext.Provider value={datasContextValue}>{children}</DatasContext.Provider>
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
