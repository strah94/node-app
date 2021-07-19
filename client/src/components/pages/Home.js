import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import Posts from "../posts/Posts";
import PostModal from "../posts/PostModal";
import PostsContext from "../../context/posts/postsContext";
import PermissionsModal from "../permissions/PermissionsModal";

const Home = () => {
  const authContext = useContext(AuthContext);
  const postsContext = useContext(PostsContext);

  const { showModal, showPermissionsModal } = postsContext;

  useEffect(async () => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div
      className="homeContainer"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button className="add-btn" onClick={showModal}>
        ADD POST
      </button>
      <button className="permissions-btn" onClick={showPermissionsModal}>
        PERMISSIONS
      </button>
      <Posts />
      <PostModal />
      <PermissionsModal />
    </div>
  );
};

export default Home;
