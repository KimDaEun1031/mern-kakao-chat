import {
  TOGGLE_SORT_BUTTON,
  SHOW_CHAT,
  ADD_MESSAGE,
  SHOW_LIST,
  TOGGLE_EXIT_BUTTON
} from "./types";

export const toggleSortBtn = () => {
  return {
    type: TOGGLE_SORT_BUTTON
  };
};

export const toggleExitBtn = () => {
  return {
    type: TOGGLE_EXIT_BUTTON
  };
};

export const showChatView = (id, roomId) => {
  return {
    type: SHOW_CHAT,
    payload: { id, roomId }
  };
};

export const addMessage = (message, roomId) => {
  return {
    type: ADD_MESSAGE,
    payload: { message, roomId }
  };
};

export const showList = (keyword) => {
  return {
    type: SHOW_LIST,
    payload: { keyword }
  };
};
