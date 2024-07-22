const API_URL = import.meta.env.VITE_API_URL;

async function retryFetch(url, retries = 5, delay = 0) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else if (response.status >= 500 && retries > 0) {
      console.warn(
        `후원을 기다리는 조공 데이터 불러오기 실패 남은 재시도 횟수: ${retries}`,
      );
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryFetch(url, retries - 1, delay);
    } else {
      throw new Error(`HTTP-오류: ${response.status}`);
    }
  } catch (error) {
    if (retries > 0) {
      console.warn(
        `후원을 기다리는 조공 데이터 불러오기 실패 남은 재시도 횟수: ${retries}`,
      );
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryFetch(url, retries - 1, delay);
    } else {
      alert(
        `후원을 기다리는 조공 데이터 불러오기를 여러 번 시도 후에도 요청에 실패했습니다: ${error.message}`,
      );
      throw error;
    }
  }
}

export async function getFundingApi() {
  const url = `${API_URL}/donations?pageSize=10`;
  try {
    const result = await retryFetch(url);
    if (Array.isArray(result.list)) {
      const newResult = result.list.filter(item => item.status);
      return newResult;
    } else {
      throw new Error('응답 형식이 올바르지 않습니다');
    }
  } catch (error) {
    console.error('후원을 기다리는 조공 데이터 불러오기 실패했습니다:', error);
  }
}

export async function getRecheckApi(idolId) {
  const url = `${API_URL}/donations?pageSize=1&priorityIdolIds=${idolId}`;
  try {
    const result = await retryFetch(url);
    return result;
  } catch (error) {
    console.error(
      '후원을 기다리는 조공 재확인 데이터를 가져오는데 실패했습니다:',
      error,
    );
  }
}

export async function putDonationsApi(id, creditUse) {
  const url = `${API_URL}/donations/${id}/contribute`;
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
      throw new Error('네트워크 응답이 올바르지 않습니다');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('후원하기 요청에 실패했습니다:', error);
  }
}
