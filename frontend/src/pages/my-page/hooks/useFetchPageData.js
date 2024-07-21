import { useCallback, useRef, useState } from 'react';
import { fetchAsyncData } from '../app/apis';

const useFetchPageData = () => {
  const [status, setIsStatus] = useState('pending');
  const abortControllerRef = useRef(null);

  const getLazyData = useCallback(async (query, retry = 2, delay = 1000) => {
    try {
      setIsStatus('pending');
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;
      const response = await fetchAsyncData(query, signal);
      if (!response.ok) throw new Error('First request Failure');
      return response;
    } catch (e) {
      if (e.name === 'AbortError') {
        console.error('Request Abort');
        setIsStatus('rejected');
        return null;
      }
      if (retry === 0) {
        console.error('Last Request Failure');
        setIsStatus('rejected');
        return null;
      }
      setTimeout(() => {
        console.log('Request Retry');
        getLazyData(query, retry - 1);
      }, delay);
    } finally {
      setIsStatus('fullfield');
    }
  }, []);

  return [
    getLazyData,
    { isLoading: status === 'pending' ? true : false, isError: status === 'rejected' ? true : false },
  ];
};
export default useFetchPageData;
