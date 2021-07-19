import React, { useReducer } from "react";
import postsReducer from "./postsReducer";
import PostsContext from "./postsContext";
import axios from "axios";

import {
  ADD_POST,
  GET_ALL_COMMENTS,
  GET_ALL_POSTS,
  HIDE_MODAL,
  SET_CURRENT_POST,
  SHOW_MODAL,
  CLEAR_CURRENT_POST,
  SHOW_PERMISSIONS_MODAL,
  HIDE_PERMISSIONS_MODAL,
  SET_USERS_PERMISSIONS,
} from "../types";

const PostsState = (props) => {
  const initialState = {
    posts: [],
    currentPost: null,
    comments: [],
    modal: false,
    permissionsModal: false,
    usersPermissions: [],
  };

  const [state, dispatch] = useReducer(postsReducer, initialState);

  // Get all posts

  const getAllPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      const posts = await res.data;

      dispatch({ type: GET_ALL_POSTS, payload: posts });
    } catch (error) {
      //   dispatch({ type: AUTH_ERROR });
    }
  };

  // Get all comments

  const getAllComments = async () => {
    try {
      const res = await axios.get("/api/comments");
      const comments = await res.data;

      dispatch({ type: GET_ALL_COMMENTS, payload: comments });
    } catch (error) {
      //   dispatch({ type: AUTH_ERROR });
    }
  };

  // Add post

  const addPost = async (title, postText, userID) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "/api/posts",
        { title, postText, userID },
        config
      );

      getAllPosts();
      hideModal();
    } catch (error) {
      //   dispatch({ type: AUTH_ERROR });
      alert(`${error.response.status} ${error.response.data.msg}`);
    }
  };

  // Add post

  const updatePost = async (postTitle, postText, userID, postID) => {
    console.log(postText, postTitle, userID, postID);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/posts/${postID}`,
        { postTitle, postText, userID },
        config
      );
      getAllPosts();
      hideModal();
      clearCurrentPost();
    } catch (error) {
      alert(`${error.response.status} ${error.response.data.msg}`);
    }
  };

  // Set current post

  const setCurrentPost = (post) => {
    dispatch({ type: SET_CURRENT_POST, payload: post });
  };

  // Clear current post

  const clearCurrentPost = () => {
    dispatch({ type: CLEAR_CURRENT_POST });
  };

  // Delete post

  const deletePost = async (postID, userID) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const res = await axios.delete(
        `/api/posts/${postID}`,
        { postID, userID },
        config
      );

      getAllPosts();
    } catch (error) {
      //   dispatch({ type: AUTH_ERROR });
    }
  };

  //Add comment

  const addComment = async (text, postID, userID) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "/api/comments",
        { text, postID, userID },
        config
      );

      getAllComments();
    } catch (error) {
      //   dispatch({ type: AUTH_ERROR });
    }
  };

  // Get all comments

  const getAllPermissions = async (ownerID) => {
    console.log(ownerID);
    try {
      const res = await axios.get("/api/permissions", {
        params: {
          ownerID,
        },
      });
      // const permissions = await res.data;

      dispatch({ type: SET_USERS_PERMISSIONS, payload: res.data });
    } catch (error) {
      //   dispatch({ type: AUTH_ERROR });
    }
  };

  // add permission

  const addPermission = async (userID, permissionsUserID) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "/api/permissions",
        { userID, permissionsUserID },
        config
      );
    } catch (error) {
      //   dispatch({ type: AUTH_ERROR });
    }
  };

  // Delete permission

  const deletePermission = async (permissionsUserID) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const res = await axios.delete(
        `/api/permissions/${permissionsUserID}`,
        config
      );
    } catch (error) {
      //   dispatch({ type: AUTH_ERROR });
    }
  };

  // Show modal

  const showModal = () => {
    dispatch({ type: SHOW_MODAL });
  };

  // Hide modal

  const hideModal = () => {
    dispatch({ type: HIDE_MODAL });
  };

  // Show modal

  const showPermissionsModal = () => {
    dispatch({ type: SHOW_PERMISSIONS_MODAL });
  };

  // Hide modal

  const hidePermissionsModal = () => {
    dispatch({ type: HIDE_PERMISSIONS_MODAL });
  };

  return (
    <PostsContext.Provider
      value={{
        posts: state.posts,
        comments: state.comments,
        modal: state.modal,
        currentPost: state.currentPost,
        permissionsModal: state.permissionsModal,
        usersPermissions: state.usersPermissions,
        getAllPosts,
        getAllComments,
        addPost,
        deletePost,
        setCurrentPost,
        hideModal,
        showModal,
        addComment,
        updatePost,
        showPermissionsModal,
        hidePermissionsModal,
        getAllPermissions,
        addPermission,
        deletePermission,
        clearCurrentPost,
      }}
    >
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsState;
