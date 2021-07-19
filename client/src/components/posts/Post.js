import React, { useContext, useState, useEffect } from "react";
import PostsContext from "../../context/posts/postsContext";
import AuthContext from "../../context/auth/authContext";

const Post = ({ post }) => {
  const authContext = useContext(AuthContext);
  const postsContext = useContext(PostsContext);

  const { comments, addComment, deletePost, setCurrentPost, showModal } =
    postsContext;
  const { user } = authContext;

  const [postComments, setPostComments] = useState([]);
  const [comment, setComment] = useState("");
  const [showCommentsInput, setShowCommentsInput] = useState(false);

  useEffect(() => {
    let commentsArray = [];

    comments &&
      comments.forEach((comment) => {
        comment.post_id === post.id && commentsArray.push(comment);
      });

    setPostComments(commentsArray);
  }, [comments]);

  const onChange = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(comment, post.id, user.id);
    setShowCommentsInput(false);
    setComment("");
  };

  const onComment = (e) => {
    showCommentsInput
      ? setShowCommentsInput(false)
      : setShowCommentsInput(true);
  };
  const onEdit = (e) => {
    setCurrentPost(post);
    showModal();
  };

  const onDelete = () => {
    deletePost(post.id, user.id);
  };

  return (
    <div>
      <div className="post">
        <button onClick={onDelete} className="delete-post">
          X
        </button>
        <button className="edit-post" onClick={onEdit}>
          EDIT
        </button>
        <h1>{post.post_title}</h1>
        <p>{post.post_text}</p>
      </div>
      <div className="comments">
        <button onClick={onComment}>COMMENT</button>

        {postComments.map((comment) => (
          <p key={comment.id}>{comment.comment_text}</p>
        ))}
        {showCommentsInput && (
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="comment"
              value={comment}
              onChange={onChange}
            ></input>
            <input
              type="submit"
              value="addComment"
              className="add-comment"
            ></input>
          </form>
        )}
      </div>
    </div>
  );
};

export default Post;
