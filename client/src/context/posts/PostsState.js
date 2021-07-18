import React, { useReducer } from "react";
import postsReducer from "./postsReducer";
import PostsContext from "./postsContext";
import axios from "axios";

import {
  ADD_POST,
  GET_ALL_COMMENTS,
  GET_ALL_POSTS,
  HIDE_MODAL,
  SHOW_MODAL,
} from "../types";

const PostsState = (props) => {
  const initialState = {
    posts: [],
    comments: [],
    modal: false,
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

      alert(res.data.msg);
      getAllPosts();
      hideModal();
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

  // Show modal

  const showModal = () => {
    dispatch({ type: SHOW_MODAL });
  };

  // Show modal

  const hideModal = () => {
    dispatch({ type: HIDE_MODAL });
  };

  return (
    <PostsContext.Provider
      value={{
        posts: state.posts,
        comments: state.comments,
        modal: state.modal,
        getAllPosts,
        getAllComments,
        addPost,
        hideModal,
        showModal,
        addComment,
      }}
    >
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsState;
