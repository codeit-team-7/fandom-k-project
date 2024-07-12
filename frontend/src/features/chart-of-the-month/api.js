export const getIdolList = async ({ cursor = 0 }) => {
  const pageSize = window.innerWidth > 1024 ? 10 : 5;
  try {
    const response = await fetch(
      `https://fandom-k-api.vercel.app/8-7/idols?cursor=${cursor}&pageSize=${pageSize}&sort=totalVote
`
    );
    const idolList = await response.json();
    console.log(idolList);
    return idolList;
  } catch (err) {
    console.log("패치에러", err);
  }
};
