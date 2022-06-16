import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Input,
  TextField,
  Box,
  LinearProgress
} from "@material-ui/core";
import { storage, db } from "../../firebase";
import firebase from "firebase/compat/app";

import styles from "./style";

const useStyles = makeStyles(styles);

function makeid(length) {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}

function Uploadpage({ username, photoURL }) {
  const classes = useStyles();
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [URL, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      readURL(e.target);
    }
  };

  const handleUpload = () => {
    //console.log(storage.ref);
    //console.log(" is storage");

    if (image?.name) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //progress function ...2
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);

          if (snapshot.bytesTransferred === snapshot.totalBytes) {
            history.replace("/home");
          }
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: url,
                username: username,
                avatar: firebase.auth().currentUser.photoURL
              });

              setProgress(0);
              setCaption("");
              setImage(null);
            });
        }
      );
    } else {
      const name = makeid(5);
      const uploadTask = storage.ref(`images/${name}`).put(name);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //progress function ...2
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);

          if (snapshot.bytesTransferred === snapshot.totalBytes) {
            history.replace("/home");
          }
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          storage
            .ref("images")
            .child(name)
            .getDownloadURL()
            .then((url) => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: URL,
                username: username
              });

              setProgress(0);
              setCaption("");
              setImage(null);
            });
        }
      );
    }
  };

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      console.log("Loading Image preview...");
      reader.onload = function () {
        var dataURL = reader.result;
        setImagePreview(dataURL);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  return (
    <div className={classes.uploadPage}>
      {!image && (
        <label htmlFor="contained-button-file">
          <Box className={classes.uploadArea}>
            <span className={classes.text}>Click to upload Image</span>
          </Box>
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            className={classes.input}
            onChange={handleChange}
          />
        </label>
      )}
      {image && (
        <Box className={classes.uploadArea}>
          <img
            src={imagePreview}
            className={classes.imagePreview}
            alt="User uploaded file"
          />
        </Box>
      )}
      <label className={classes.caption}>
        <TextField
          label="URL"
          variant="filled"
          placeholder="Paste a URL ..."
          onChange={(e) => setUrl(e.target.value)}
          value={URL}
          className={classes.captionInput}
        />
      </label>
      <label className={classes.caption}>
        <TextField
          label="Caption"
          variant="filled"
          placeholder="Enter a caption..."
          onChange={(e) => setCaption(e.target.value)}
          value={caption}
          className={classes.captionInput}
        />
      </label>
      <label className={classes.upload}>
        <Button onClick={handleUpload} className={classes.uploadBtn}>
          Upload
        </Button>
      </label>
      <LinearProgress
        className={classes.progressBar}
        variant="determinate"
        value={progress}
      />
    </div>
  );
}

export default Uploadpage;
