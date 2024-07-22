import { QueryContext, DatasContext, FavoriteContext } from '../app/contexts';
import useMyPageContext from './useMyPageContext';

const useMyPageState = () => ({
  QueryState: useMyPageContext(QueryContext),
  DatasState: useMyPageContext(DatasContext),
  FavoriteState: useMyPageContext(FavoriteContext),
});

export default useMyPageState;
