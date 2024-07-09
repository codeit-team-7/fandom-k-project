// 베이스 픽셀
const BASE_PIXEL = 16;

/***
 * 픽셀 값을 BASE_PIXEL값으로 나누어 rem단위로 변환합니다.
 * @param {number} px 변환 할 px값
 * @returns {string} 변환 된 rem값
 */
export const pxr = (px) => `${px / BASE_PIXEL}rem`;

/***
 * 픽셀 값을 BASE_PIXEL값으로 나누어 em단위로 변환합니다.
 * @param {number} px 변환할 px값
 * @returns 변환 된 em값
 */
export const pxe = (px) => `${px / BASE_PIXEL}em`;

/**
 * 들어온 값들 중, 값의 타입이 숫자라면 해당 숫자를 REM단위로 변경하는 템플릿 리터럴 함수.
 * @param {string} strings 템플릿 리터럴의 문자열 부분
 * @param {...*} values 템플릿 리터럴에 삽입된 표현식 값들
 * @returns {string} 처리된 결과 문자열
 */
export const px = (strings, ...values) => {
  return strings.reduce((acc, str, i) => {
    const value = values[i];
    if (value) {
      if (typeof value === "number") {
        return acc + str + pxr(value);
      } else {
        return acc + str + value;
      }
    }
    return acc + str;
  }, "");
};
