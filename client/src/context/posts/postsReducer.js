import {
  GET_ALL_POSTS,
  GET_ALL_COMMENTS,
  SHOW_MODAL,
  HIDE_MODAL,
  SET_CURRENT_POST,
  CLEAR_CURRENT_POST,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case GET_ALL_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case SHOW_MODAL:
      return {
        ...state,
        modal: true,
      };
    case HIDE_MODAL:
      return {
        ...state,
        modal: false,
      };
    case SET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.payload,
      };
    case CLEAR_CURRENT_POST:
      return {
        ...state,
        currentPost: {},
      };
    default:
      return state;
  }
};
