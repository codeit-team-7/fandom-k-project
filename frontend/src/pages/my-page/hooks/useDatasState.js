import { useContext } from 'react';

const useDatasState = Context => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('Provider 내부에서 사용해주세요.');
  }
  return context;
};

export default useDatasState;
