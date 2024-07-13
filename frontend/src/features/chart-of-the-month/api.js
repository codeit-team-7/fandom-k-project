export const getIdolList = async ({ cursor = 0, gender = "female" }) => {
  const pageSize = window.innerWidth > 1024 ? 10 : 5;
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
