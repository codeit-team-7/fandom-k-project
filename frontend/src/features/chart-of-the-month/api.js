const API_URL = import.meta.env.VITE_API_URL;

export const getIdolList = async ({ cursor, gender, pageSize = 10 }) => {
  try {
    const response = await fetch(
      `${API_URL}/charts/{gender}?gender=${gender}&pageSize=${pageSize}&cursor=${cursor}`,
    );
    const idolList = await response.json();
    return idolList;
  } catch (err) {
    return { idols: null, nextCursor: null };
  }
};

export const postVote = async idolId => {
  try {
    await fetch(`${API_URL}/votes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idolId: idolId,
      }),
    });
    return true;
  } catch (err) {
    return false;
  }
};
