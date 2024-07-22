const API_URL = import.meta.env.VITE_API_URL;

export const fetchAsyncData = async ({ pageSize, cursor = 0 }, signal) => {
  return await fetch(`${API_URL}/idols?pageSize=${pageSize}&cursor=${cursor}`, {
    signal,
  });
};
