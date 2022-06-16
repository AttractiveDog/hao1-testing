import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./style.js";
import { db } from "../../firebase";
import { initializeApp } from "firebase/app";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LikePanel from "../LikePanel/index.js";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { Button } from "@material-ui/core";
import firebase from "firebase/compat/app";

const useStyles = makeStyles(styles);

function Post({ postId, user, username, caption, imageUrl, avatar, setId }) {
  const classes = useStyles();
  const postImage = useRef();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [temp, setTemp] = useState(classes.showComments);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      username: user.displayName,
      text: comment
    });
    setComment("");
  };

  useEffect(() => {
    postImage.current.onload = () => {
      if (postImage.current.height > postImage.current.width) {
        postImage.current.style.maxHeight = "350px";
      } else if (postImage.current.height < postImage.current.width) {
        postImage.current.style.maxWidth = "100%";
      } else {
        postImage.current.style.maxHeight = "350px";
      }
    };
  }, []);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          const tempComments = [];
          for (let doc of snapshot.docs) {
            tempComments.unshift(doc.data());
          }
          setComments(tempComments);
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const handleChange = () => {
    setId(postId);
  };

  return (
    <div className={classes.post}>
      <div className={classes.postHeader}>
        <Link to={`/profile/${username}`} style={{ textDecoration: "none" }}>
          <Avatar className={classes.avatar} src={avatar} />
        </Link>

        <h3 className={classes.username}>{username}</h3>
      </div>

      <div className={classes.postText}>
        <strong>{caption}</strong>
      </div>

      <div className={classes.postImageHolder}>
        <img
          className={classes.postImage}
          src={imageUrl}
          alt="PostImage"
          ref={postImage}
        />
      </div>
      <div className={classes.reactions}>
        <LikePanel postId={postId} user={user} />

        <div
          className={temp}
          onMouseOver={() => setTemp(classes.showCommentsHover)}
          onMouseOut={() => setTemp(classes.showComments)}
          onClick={handleChange}
        >
          <Button>
            <ChatBubbleOutlineIcon />
            {comments.length} comments
          </Button>
        </div>
      </div>
      <div className={classes.postComments}>
        {comments &&
          comments.map((comment, index) => (
            <p key={`comment-index-${index}`}>
              <strong> {comment.username} : </strong> {comment.text}
            </p>
          ))[0]}
      </div>

      {user && (
        <form className={classes.postCommentBox}>
          <input
            className={classes.postCommentInput}
            type="text"
            placeholder="Add a comment.."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className={classes.postCommentButton}
            type="submit"
            disabled={!comment}
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}

      <Link to={`/post/${postId}`} className={classes.viewPostBtn}>
        View Post
      </Link>
    </div>
  );
}

export default Post;
