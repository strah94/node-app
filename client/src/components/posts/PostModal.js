import React, { useState, useContext, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
import PostsContext from "../../context/posts/postsContext";

const PostModal = () => {
  const authContext = useContext(AuthContext);
  const postsContext = useContext(PostsContext);

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const { user } = authContext;
  const { addPost, modal } = postsContext;

  const onChange = (e) => {
    e.target.name === "title"
      ? setTitle(e.target.value)
      : setPostText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addPost(title, postText, user.id);
  };

  return (
    <Fragment>
      {modal && (
        <div className="modal">
          <form onSubmit={onSubmit} onSubmit={onSubmit}>
            <h2 className="text-primary">
              {/* {current ? "Edit Contact" : "Add contact"}{" "} */}
              Add new post
            </h2>

            {/* <h3>TITLE</h3> */}
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
              value="Add post"
              className="btn btn-primary btn-block"
            />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default PostModal;
