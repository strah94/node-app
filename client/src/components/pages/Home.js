import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import Posts from "../posts/Posts";
import PostModal from "../posts/PostModal";
import PostsContext from "../../context/posts/postsContext";
const Home = () => {
  const authContext = useContext(AuthContext);
  const postsContext = useContext(PostsContext);

  const { showModal } = postsContext;

  useEffect(async () => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="homeContainer">
      <button className="add-btn" onClick={showModal}>
        ADD POST
      </button>
      <Posts />
      <PostModal />
    </div>
  );
};

export default Home;
