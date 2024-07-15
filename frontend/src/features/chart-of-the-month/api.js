const API_URL = import.meta.env.VITE_API_URL;
export const getIdolList = async ({
  cursor = 0,
  gender = "female",
  pageSize = 10,
}) => {
  cursor = gender === "female" ? cursor.female : cursor.male;
  try {
    const response = await fetch(
      `${API_URL}/charts/{gender}?gender=${gender}&pageSize=${pageSize}&cursor=${cursor}`
    );
    const idolList = await response.json();
    return idolList;
  } catch (err) {
    console.log("패치에러", err);
  }
};

export const postVote = async (idolId) => {
  try {
    await fetch(`${API_URL}/votes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idolId: idolId,
      }),
    });
  } catch (err) {}
};
