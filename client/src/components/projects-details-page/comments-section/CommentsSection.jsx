import React, { useEffect, useState } from "react";
import styles from "./CommentsSection.module.css";
import commentsApi from "../../../api/comments-api";

const CommentsSection = ({ projectId }) => {
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      const commentsResult = await commentsApi.getAll(projectId);
      setComments(commentsResult);

      // if (projectId) {
      //   console.log(projectId);
      // }

      // if (comments) {
      //   console.log(comments);
      // }
    })();
  }, []);

  const handleAddComment = async (e) => {
    e.preventDefault();

    await commentsApi.create(projectId, username, commentText);

    setUsername("");
    setCommentText("");
  };

  return (
    <div className={styles.commentsSection}>
      <h3>Comments</h3>
      <form onSubmit={handleAddComment}>
        <input
          className={styles.commentInput}
          type="text"
          name="username"
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          className={styles.commentInput}
          type="text"
          name="comment"
          placeholder="Write a comment..."
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
        />
        <input
          type="submit"
          className={styles.addCommentButton}
          value="Add Comment"
        />
      </form>

      <div className={styles.commentsList}>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className={styles.comment}>
              <h4>{comment.username}</h4>
              <p>{comment.text}</p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
