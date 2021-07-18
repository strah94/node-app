import React, { useReducer } from "react";
import postsReducer from "./postsReducer";
import PostsContext from "./postsContext";
import axios from "axios";

import { GET_ALL_COMMENTS, GET_ALL_POSTS } from "../types";

const PostsState = (props) => {
  const initialState = {
    posts: [],
    comments: [],
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

  return (
    <PostsContext.Provider
      value={{
        posts: state.posts,
        comments: state.comments,
        getAllPosts,
        getAllComments,
      }}
    >
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsState;
