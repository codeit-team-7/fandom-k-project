import { useEffect } from "react";
import styled from "styled-components";

import { debounce } from "@utils";
import { AddYourFavoriteIdol, FavoriteIdol } from "@features";
import { Container } from "@styles/StylesByWoosung";

import { useMyPageReducer } from "./hooks/use-mypage-reducer";
import { useMyPageStorageReducer } from "./hooks/use-mypage-storage-reducer";
import { Button } from "@styles/Button";
import { media } from "@utils";
import { useNavigate } from "react-router-dom";
import { updateIdols } from "./api";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-content: center;

  ${media.base`
    .hr {
      width: 100%;
      height: ${2};
      background: white;
      opacity: 0.2;
      margin: ${34} 0;
    }  
  `}
`;

const StyledButton = styled(Button)`
  ${media.base`
    width: ${255};
    height: ${48};
    transform: translateY(${24});
    align-self: center;
    font-size: ${17};
  `}
`;

export default function Index() {
  const navitate = useNavigate();
  const { store, chooseAnIdol } = useMyPageStorageReducer();
  const { state, fetchItems } = useMyPageReducer();

  const handleScroll = debounce((e) => {
    const { scrollLeft, scrollWidth, offsetWidth } = e.target;
    if (scrollWidth - scrollLeft === offsetWidth) {
      const addedPageSize = Math.ceil(innerWidth / 100) * 2;
      fetchItems({ scroll: true, addedPageSize });
    }
  }, 200);

  useEffect(() => {
    const handleResize = debounce(() => {
      fetchItems({ reset: true });
    }, 200);

    fetchItems({ reset: true });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (e) => {
    const id = e.target.id;
    fetchItems({ direction: id });
  };

  const handleChoose = (e) => {
    const { target } = e;
    if (target.classList.contains("item-picture")) {
      const targetId = Number(target.dataset.id);
      const item = state.items.find((item) => item.id === targetId);
      chooseAnIdol(item);
    }
  };

  const handleAdd = () => {
    updateIdols(store);
    navitate("/list");
  };

  return (
    <main>
      <StyledContainer $width={1920} $padding={360}>
        <FavoriteIdol store={store} />
        <div className="hr"></div>
        <AddYourFavoriteIdol
          store={store}
          state={state}
          handleClick={handleClick}
          handleChoose={handleChoose}
          handleScroll={handleScroll}
        />
        <StyledButton onClick={handleAdd}>+ 추가하기</StyledButton>
      </StyledContainer>
    </main>
  );
}
