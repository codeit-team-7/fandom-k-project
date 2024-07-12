import styled from "styled-components";
import { useEffect } from "react";

import { useMyPageReducer } from "./hooks/use-mypage-reducer";
import { media } from "@utils";
import { debounce } from "@utils";

const StyledSection1 = styled.section`
  ${({ theme }) => `
    ${media.base`
      #prev,
      #next {
        display: none;
      }

      .title {
        padding: 0 ${24};
      }

      .items {
        overflow: scroll hidden;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        column-gap: ${17};
        row-gap: ${24};
        padding: 0 ${24};
        height: ${360};
      }

      .item {
        flex: 0 0 auto;
      }

      .item-img {
        width: ${88};
        height: ${88};
        padding: ${5};
        border: 2px solid ${theme.colors.BRAND[100]};
        border-radius: 50%;
        object-fit: cover;
      }

      .item-box {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `}

    ${media.md`
      .content-wrap {
        display: grid;
        grid-template:
          "prev items next" auto
          "prev items next" auto
        / auto auto auto;  
        justify-content: center;
      }

      .items {
       overflow: hidden;
      }

      .items-box {

      }

      #prev,
      #next {
        cursor: pointer;
        display: block;
        align-self: center;
        width: ${29};
        height: ${135};
        border-radius: ${4};
        color: white;
        background: #1b1b1b;
      }

      #prev.hidden,
      #next.hidden {
        visibility: hidden
      }

      #prev { 
        grid-area: prev;
      }

      #next {
        grid-area: next;
      }

      .items {
        grid-area: items;
      }
    `}
  `}
`;

export default function Index() {
  const { state, fetchItems } = useMyPageReducer();
  const { items } = state;

  useEffect(() => {
    const handleScroll = debounce(() => {
      // 이 공간에 무한 스크롤을 구현합니다.
    }, 300);
    const items = document.getElementById("items");
    items && items.addEventListener("scroll", handleScroll);
    return () => {
      items && items.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = debounce(() => {
      fetchItems({ reset: true });
    }, 300);

    fetchItems({ reset: true });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (e) => {
    const id = e.target.id;
    fetchItems({ direction: id });
  };

  return (
    <main>
      <section>
        <h1>내가 관심있는 아이돌</h1>
      </section>
      <StyledSection1>
        <h1 className="title">관심 있는 아이돌을 추가해보세요</h1>
        <div className="content-wrap">
          <button
            id="prev"
            className={`${state.currentCursorIndex < 1 && "hidden"}`}
            onClick={handleClick}
          >
            {"<"}
          </button>
          <ul id="items" className="items">
            {items &&
              items.map((item) => (
                <li className="item" key={item.id}>
                  <img className="item-img" src={item.profilePicture} alt="" />
                  <div className="item-box">
                    <p>{item.name}</p>
                    <p>{item.group}</p>
                  </div>
                </li>
              ))}
          </ul>
          <button
            id="next"
            className={`${
              state.cursors.length < 2 ||
              (state.cursors[state.currentCursorIndex + 1] === null && "hidden")
            }`}
            onClick={handleClick}
          >
            {">"}
          </button>
        </div>
      </StyledSection1>
    </main>
  );
}
