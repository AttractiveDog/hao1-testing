import React, { useEffect, useState } from "react";
import styles from "./style.js";
import { db } from "../../firebase";
import {
  Avatar,
  Fade,
  Modal,
  Typography,
  Backdrop,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles(styles);

function LikePanel({ postId, user }) {
  const classes = useStyles();

  const [like, setLike] = useState(false);
  const [usersLiked, setUsersLiked] = useState([]);
  const [likeCounter, setLikeCounter] = useState(0);
  const [likeModal, setLikeModal] = useState(false);

  const onLike = (e) => {
    e.preventDefault();
    if (user) {
      db.collection("posts")
        .doc(postId)
        .collection("likes")
        .doc(user.uid)
        .set({
          username: user.displayName,
          photoURL: user.photoURL
        })
        .then(() => {
          setLike(true);
          setLikeCounter(likeCounter + 1);
        })
        .catch((err) => console.log(err));
    }
  };

  const onDislike = (e) => {
    e.preventDefault();
    if (user) {
      db.collection("posts")
        .doc(postId)
        .collection("likes")
        .doc(user.uid)
        .delete()
        .then(() => {
          setLike(false);
          setLikeCounter(likeCounter - 1);
        })
        .catch((err) => console.log(err));
    }
  };

  // Getting Post's like data and updating like state
  useEffect(() => {
    db.collection("posts")
      .doc(postId)
      .collection("likes")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({
            userName: doc.data().username,
            photoURL: doc.data().photoURL,
            userId: doc.id
          });
        });
        setUsersLiked(documents);
        setLikeCounter(documents.length);
        if (user) {
          documents.map((u) => {
            if (u.userId === user.uid) {
              setLike(true);
            }
          });
        }
      });
  }, []);

  return (
    <>
      <div className={classes.likeContainer}>
        <Button>
          {like ? (
            <FavoriteIcon onClick={onDislike} />
          ) : (
            <FavoriteBorderIcon onClick={onLike} />
          )}
          {likeCounter ? (
            <Typography>
              {" "}
              <b
                className={classes.likeCounter}
                onClick={() => setLikeModal(true)}
              >
                {likeCounter} {likeCounter > 1 ? "" : ""}
              </b>
            </Typography>
          ) : null}
        </Button>
      </div>

      <Modal
        className={classes.modal}
        open={likeModal}
        onClose={() => setLikeModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={likeModal}>
          <div className={classes.paper}>
            <h2>Users Liked:</h2>
            <Divider />
            <List className={classes.likelist}>
              {usersLiked.map((user) => (
                <ListItem button key={user.userId}>
                  <ListItemAvatar>
                    <Avatar
                      className={classes.avatar}
                      alt={user.userName}
                      src={user?.photoURL}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={user.userName} />
                </ListItem>
              ))}
            </List>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default LikePanel;
