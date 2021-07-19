import {
  GET_ALL_POSTS,
  GET_ALL_COMMENTS,
  SHOW_MODAL,
  HIDE_MODAL,
  SET_CURRENT_POST,
  CLEAR_CURRENT_POST,
  SHOW_PERMISSIONS_MODAL,
  HIDE_PERMISSIONS_MODAL,
  SET_USERS_PERMISSIONS,
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
        currentPost: null,
      };
    case SHOW_PERMISSIONS_MODAL:
      return {
        ...state,
        permissionsModal: true,
      };
    case HIDE_PERMISSIONS_MODAL:
      return {
        ...state,
        permissionsModal: false,
      };
    case SET_USERS_PERMISSIONS:
      return {
        ...state,
        usersPermissions: action.payload,
      };
    default:
      return state;
  }
};
