const STORAGE_NAME = 'FAVORITE-IDOLS';

export const fetchIdols = () => {
  const storedValue = localStorage.getItem(STORAGE_NAME);
  if (!storedValue) {
    localStorage.setItem(STORAGE_NAME, JSON.stringify([]));
    return [];
  } else {
    try {
      return JSON.parse(storedValue);
    } catch (error) {
      localStorage.setItem(STORAGE_NAME, JSON.stringify([]));
      return [];
    }
  }
};

export const updateIdols = store => {
  localStorage.setItem(STORAGE_NAME, JSON.stringify(store));
};
