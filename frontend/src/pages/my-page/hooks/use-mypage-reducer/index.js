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
      if (action.reset) {
        newCurrentCursorIndex = 0;
        newCursors = [0];
        newCursors.push(action.payload.cursor);
      } else if (action.direction === "next") {
        newCursors.push(action.payload.cursor);
      } else if (action.direction === "prev") {
        newCursors.length > 2 && newCursors.pop();
      }

      return {
        ...state,
        loading: false,
        items: action.payload.items,
        cursors: newCursors,
        currentCursorIndex: newCurrentCursorIndex,
      };
    }
  }
};

export const useMyPageReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchItems = async ({ reset = false, direction = "" }) => {
    const pageSize = calculatePageSize(innerWidth);
    let cursorIndex = state.currentCursorIndex;
    if (reset) {
      cursorIndex = 0;
    } else if (direction === "next") {
      cursorIndex = Math.min(cursorIndex + 1, state.cursors.length - 1);
    } else if (direction === "prev") {
      cursorIndex = Math.max(cursorIndex - 1, 0);
    }
    const cursor = state.cursors[cursorIndex];
    const response = await fetch(
      `${API_URL}?pageSize=${pageSize}&cursor=${cursor}`
    );
    const data = await response.json();
    dispatch({
      type: "FETCH_SUCCESS",
      reset,
      direction,
      payload: {
        items: data.list,
        cursor: data.nextCursor,
        cursorIndex,
      },
    });
  };

  return { state, fetchItems };
};
