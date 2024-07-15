import { useEffect } from "react";

import { debounce } from "@utils";
import { AddYourFavoriteIdol, FavoriteIdol } from "@features";
import { Container } from "@styles/StylesByWoosung";

import { useMyPageReducer } from "./hooks/use-mypage-reducer";
import { useMyPageStorageReducer } from "./hooks/use-mypage-storage-reducer";

export default function Index() {
  const { store, chooseAnIdol } = useMyPageStorageReducer();
  const { state, fetchItems } = useMyPageReducer();

  useEffect(() => {
    const handleScroll = debounce((e) => {
      const { scrollLeft, scrollWidth, offsetWidth } = e.target;
      if (scrollWidth - scrollLeft === offsetWidth) {
        const addedPageSize = Math.ceil(innerWidth / 100) * 2;
        fetchItems({ scroll: true, addedPageSize });
      }
    }, 200);
    const items = document.getElementById("items");

    items && items.addEventListener("scroll", handleScroll);
    return () => {
      items && items.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.pageSize]);

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

  return (
    <main>
      <Container $width={1920} $padding={360}>
        <FavoriteIdol store={store} />
        <hr />
        <AddYourFavoriteIdol
          store={store}
          state={state}
          handleClick={handleClick}
          handleChoose={handleChoose}
        />
      </Container>
    </main>
  );
}
