export async function getFundingApi() {
  const response = await fetch(
    `https://fandom-k-api.vercel.app/8-7/donations?pageSize=10`
  );
  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
