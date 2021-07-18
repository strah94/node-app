import React, { useContext, useState, useEffect } from "react";
import PostsContext from "../../context/posts/postsContext";

const Post = ({ post }) => {
  const postsContext = useContext(PostsContext);
  const { comments } = postsContext;

  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    let commentsArray = [];

    comments &&
      comments.forEach((comment) => {
        comment.post_id === post.id && commentsArray.push(comment);
      });

    setPostComments(commentsArray);
  }, [comments]);

  return (
    <div>
      <div className="post">
        <h1 style={{ color: "green" }}>{post.post_title}</h1>
        <p>{post.post_text}</p>
      </div>
      {postComments.map((comment) => (
        <p key={comment.id}>{comment.comment_text}</p>
      ))}
    </div>
  );
};

export default Post;
