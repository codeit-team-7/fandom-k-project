import { useReducer } from "react";
import { calculatePageSize } from "../../utils/calculator-page";

const API_URL = import.meta.env.VITE_API_URL + "/idols";

const initialState = {
  items: [],
  cursors: [0],
  currentCursorIndex: 0,
  pageSize: 0,
  error: null,
  loading: false,
  next: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "FETCH_SUCCESS": {
      let newCursors = state.cursors;
      let newCurrentCursorIndex = action.payload.cursorIndex;
      let newItems = null;

      if (action.reset) {
        {
          newCurrentCursorIndex = 0;
          newCursors = [0];
          newCursors.push(action.payload.cursor);
        }
      } else if (action.scroll) {
        {
          if (
            !newCursors.some((newCursor) => newCursor === action.payload.cursor)
          ) {
            newCursors.push(action.payload.cursor);
          }
          newItems = newItems
            ? action.payload.items.filter(
                (newItem) => !state.items.some((item) => newItem.id === item.id)
              )
            : [];
          newItems = [...state.items, ...newItems];
        }
      } else if (action.direction === "next") {
        {
          newCursors.push(action.payload.cursor);
        }
      } else if (action.direction === "prev") {
        {
          newCursors.length > 2 && newCursors.pop();
        }
      }

      return {
        ...state,
        loading: false,
        items: newItems || action.payload.items,
        cursors: newCursors,
        currentCursorIndex: newCurrentCursorIndex,
        pageSize: action.payload.pageSize,
      };
    }
  }
};

export const useMyPageReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchItems = async ({
    reset = false,
    scroll = false,
    direction = "",
    addedPageSize,
  }) => {
    const pageSize = addedPageSize || calculatePageSize(innerWidth);
    let cursorIndex = state.currentCursorIndex;

    {
      if (reset) {
        cursorIndex = 0;
      } else if (scroll || direction === "next") {
        cursorIndex = Math.min(cursorIndex + 1, state.cursors.length - 1);
      } else if (direction === "prev") {
        cursorIndex = Math.max(cursorIndex - 1, 0);
      }
    }

    const cursor = state.cursors[cursorIndex];
    const response = await fetch(
      `${API_URL}?pageSize=${pageSize}&cursor=${cursor}`
    );
    const data = await response.json();

    {
      dispatch({
        type: "FETCH_SUCCESS",
        reset,
        scroll,
        direction,
        payload: {
          items: data.list,
          cursor: data.nextCursor,
          cursorIndex,
          pageSize,
          next: true,
        },
      });
    }
  };

  return { state, fetchItems };
};
