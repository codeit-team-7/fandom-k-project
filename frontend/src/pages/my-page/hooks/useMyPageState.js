import useQueryState from './useQueryState';
import useDatasState from './useDatasState';
import { QueryContext, DatasContext } from '../app/contexts';

const useMyPageState = () => ({
  QueryState: useQueryState(QueryContext),
  DatasState: useDatasState(DatasContext),
});

export default useMyPageState;
