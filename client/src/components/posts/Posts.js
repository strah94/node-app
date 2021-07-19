import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import PostsContext from "../../context/posts/postsContext";
import Post from "./Post";

const Posts = () => {
  const postsContext = useContext(PostsContext);

  const { getAllPosts, posts, getAllComments } = postsContext;

  useEffect(async () => {
    getAllPosts();
    getAllComments();
  }, []);

  return (
    <Fragment>
      {posts &&
        posts.map((element) => <Post post={element} key={element.id} />)}
    </Fragment>
  );
};

export default Posts;
