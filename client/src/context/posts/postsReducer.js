import {
  GET_ALL_POSTS,
  GET_ALL_COMMENTS,
  SHOW_MODAL,
  HIDE_MODAL,
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
    default:
      return state;
  }
};
