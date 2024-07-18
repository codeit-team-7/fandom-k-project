async function retryFetch(url, retries = 5, delay = 0) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else if (response.status >= 500 && retries > 0) {
      console.warn(`Retrying fetch... Attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryFetch(url, retries - 1, delay);
    } else {
      throw new Error(`HTTP-Error: ${response.status}`);
    }
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying fetch... Attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryFetch(url, retries - 1, delay);
    } else {
      alert(`Fetch failed after multiple attempts: ${error.message}`);
      throw error;
    }
  }
}

export async function getFundingApi() {
  const url = `https://fandom-k-api.vercel.app/8-7/donations?pageSize=10`;
  try {
    const result = await retryFetch(url);
    if (Array.isArray(result.list)) {
      const newResult = result.list.filter(item => item.status);
      return newResult;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Failed to fetch funding data:', error);
  }
}

export async function getRecheckApi(idolId) {
  const url = `https://fandom-k-api.vercel.app/8-7/donations?pageSize=1&priorityIdolIds=${idolId}`;
  try {
    const result = await retryFetch(url);
    return result;
  } catch (error) {
    console.error('Failed to fetch recheck data:', error);
  }
}

export async function putDonationsApi(id, creditUse) {
  const url = `https://fandom-k-api.vercel.app/8-7/donations/${id}/contribute`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: creditUse,
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
