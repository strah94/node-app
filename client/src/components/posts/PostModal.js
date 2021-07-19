import React, { useState, useContext, Fragment, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import PostsContext from "../../context/posts/postsContext";

const PostModal = () => {
  const authContext = useContext(AuthContext);
  const postsContext = useContext(PostsContext);

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const { user } = authContext;
  const { addPost, modal, currentPost, updatePost } = postsContext;

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.post_title);
      setPostText(currentPost.post_text);
    }
  }, [modal]);

  const onChange = (e) => {
    e.target.name === "title"
      ? setTitle(e.target.value)
      : setPostText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    currentPost
      ? updatePost(title, postText, user.id, currentPost.id)
      : addPost(title, postText, user.id);

    setTitle("");
    setPostText("");
  };

  return (
    <Fragment>
      {modal && (
        <div className="modal">
          <form onSubmit={onSubmit} onSubmit={onSubmit}>
            <h2 className="text-primary">
              {currentPost ? "EDIT POST" : "ADD POST"}
            </h2>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={onChange}
            />
            <input
              type="text"
              name="postText"
              value={postText}
              onChange={onChange}
              style={{ height: "200px" }}
            />
            <input
              type="submit"
              value={currentPost ? "Update post" : "Add post"}
              className="btn btn-primary btn-block"
            />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default PostModal;
