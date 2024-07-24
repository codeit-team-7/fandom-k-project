import { MyPage } from '@features';
import ReducerContext from '@features/my-page/ReducerContext';

export default function Index() {
  return (
    <ReducerContext>
      <MyPage />
    </ReducerContext>
  );
}
