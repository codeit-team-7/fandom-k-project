import { useCallback, useRef } from "react";
import styled, { css } from "styled-components";

import useWidth from "@hooks/use-width/index";
import useFetchIdol from "./hooks/useFetchIdol";

import { BREAKPOINTS } from "@app/theme/index";
import { Container } from "@styles/StylesByWoosung";
import { media } from "@utils";
import { debounce } from "@utils";

const StyledContainer = styled(Container)`
  ${() => `
    ${media.base`
      .title {
        padding: 0 ${24};
      }
    `}
  `}
`;

const StyledList = styled.ul`
  ${({ theme }) => css`
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    ${media.base`
      padding: ${24} ${16};
      column-gap: ${17};
      max-height: ${320};
      .item {
        .img {
          width: ${88};
          height: ${88};
          padding: ${5};
          border-radius: 50%;
          border: 2px solid ${theme.colors.BRAND[100]};
          object-fit: cover;
        }
      }
    `}
  `}
`;

const calculatePageSize = (width) => {
  if (BREAKPOINTS.BASE <= width && width < BREAKPOINTS.MD) {
    return 8;
  } else if (BREAKPOINTS.MD <= width && width < BREAKPOINTS.LG) {
    return 8;
  } else {
    return 16;
  }
};

export default function Index() {
  const width = useWidth();
  const pageSizeRef = useRef(calculatePageSize(width));
  const { state, setupState } = useFetchIdol(pageSizeRef.current);
  const { list } = state.contents;

  const handleScroll = useCallback(
    (event) =>
      debounce(() => {
        const { scrollLeft, scrollWidth, offsetWidth } = event.target;
        if (offsetWidth === scrollWidth - scrollLeft) {
          pageSizeRef.current += 4;
          setupState({
            data: state.contents,
            pageSize: pageSizeRef.current,
          });
        }
        event.target;
      }, 300)(),
    [setupState, state.contents]
  );
  return (
    <main>
      <section>
        <h1>내가 좋아하는 아이돌</h1>
        <ul>
          <li></li>
        </ul>
      </section>
      <section>
        <StyledContainer $width={1920} $padding={360}>
          <h1 className="title">관심 있는 아이돌을 추가해보세요.</h1>
          <StyledList className="list" onScroll={handleScroll}>
            {list &&
              list.map((item) => (
                <li className="item" key={item.id}>
                  <img className="img" src={item.profilePicture} />
                  <p className="name">{item.name}</p>
                  <p className="group">{item.group}</p>
                </li>
              ))}
          </StyledList>
        </StyledContainer>
      </section>
    </main>
  );
}
