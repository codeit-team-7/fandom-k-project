import { useCallback, useContext, useRef } from 'react';
import { InfoContext, DataContext } from './contexts';

export const useDebounce = (callback, delay = 300) => {
  const timeoutRef = useRef(null);
  return useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
};

export const useReturnContext = Context => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('Provider 내부에서 사용되어야 합니다.');
  }
  return context;
};

export const useContextSelector = () => ({
  InfoContext: useReturnContext(InfoContext),
  DataContext: useReturnContext(DataContext),
});
