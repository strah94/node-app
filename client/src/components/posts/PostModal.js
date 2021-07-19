import React, { useState, useContext, Fragment, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import PostsContext from "../../context/posts/postsContext";
import axios from "axios";

const PostModal = () => {
  const authContext = useContext(AuthContext);
  const postsContext = useContext(PostsContext);

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [editHistory, setEditHistory] = useState([]);
  const [showEditHistory, setShowEditHistory] = useState(false);

  const { user } = authContext;
  const {
    addPost,
    modal,
    currentPost,
    updatePost,
    hideModal,
    clearCurrentPost,
  } = postsContext;

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.post_title);
      setPostText(currentPost.post_text);
      checkEditHistory();
    }
  }, [currentPost]);

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

  const onClick = (e) => {
    showEditHistory ? setShowEditHistory(false) : setShowEditHistory(true);
  };

  const checkEditHistory = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await axios.post(
      "/api/editHistory",
      { postID: currentPost.id },
      config
    );
    if (res.data.length !== 0) {
      setEditHistory(res.data);
    }
  };

  const handleCloseModal = (e) => {
    hideModal();
    currentPost && clearCurrentPost();
    setTitle("");
    setPostText("");
    setShowEditHistory(false);
  };

  return (
    <Fragment>
      {modal && (
        <div className="modal">
          {currentPost && (
            <button className="edit-history-btn" onClick={onClick}>
              edit history
            </button>
          )}
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
            <button className="close-modal" onClick={handleCloseModal}>
              X
            </button>
          </form>

          {showEditHistory && (
            <div className="edit-history">
              {editHistory &&
                editHistory.map((edit) => (
                  <div key={edit.id}>
                    <p>EDITED BY: {`${edit.first_name} ${edit.last_name}`}</p>
                    <p>TIME:{edit.time} </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default PostModal;
