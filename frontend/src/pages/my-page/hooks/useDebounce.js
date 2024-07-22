import { useRef, useCallback } from 'react';

const useDebounce = (callback, delay = 300) => {
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

export default useDebounce;
