import { BREAKPOINTS } from '@app/theme';
import { pxe, px } from '@utils';

/***
 * 미디어 쿼리 함수
 * @param {string} string 해당 템플릿 문자열을 각 브레이크 포인트에 맞게 변경합니다
 * @returns {string} 변경된 템플릿 리터럴
 */
export const media = Object.keys(BREAKPOINTS).reduce((acc, label) => {
  return (
    (acc[label.toLowerCase()] = (...args) => `
      @media (min-width: ${pxe(BREAKPOINTS[label] + 1)}) {
        ${px(...args)}
      }
    `),
    acc
  );
}, {});
