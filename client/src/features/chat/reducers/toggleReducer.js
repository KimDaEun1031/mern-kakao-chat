import {
  TOGGLE_SORT_BUTTON,
  TOGGLE_EXIT_BUTTON
} from "../types";

const initialState = {
  sortFriendList: false,
  searchExit: true,
};

function toggleReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SORT_BUTTON: {
      return {
        ...state,
        sortFriendList: !state.sortFriendList
      };
    }
    case TOGGLE_EXIT_BUTTON: {
      return {
        ...state,
        searchExit: !state.searchExit
      };
    }
    default:
      return Object.assign({}, state);
  }
}

export default toggleReducer;
