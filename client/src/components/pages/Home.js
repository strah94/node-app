import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import Posts from "../posts/Posts";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(async () => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <Posts />
    </div>
  );
};

export default Home;
