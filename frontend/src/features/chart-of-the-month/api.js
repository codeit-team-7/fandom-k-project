export const getIdolList = async ({
  cursor = 0,
  gender = "female",
  pageSize = 10,
}) => {
  try {
    const response = await fetch(
      `https://fandom-k-api.vercel.app/8-7/charts/{gender}?gender=${gender}&pageSize=${pageSize}&cursor=${cursor}`
    );
    const idolList = await response.json();
    return idolList;
  } catch (err) {
    console.log("패치에러", err);
  }
};

export const postVote = async (idolId) => {
  try {
    const response = await fetch(`https://fandom-k-api.vercel.app/8-7/votes`, {
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
