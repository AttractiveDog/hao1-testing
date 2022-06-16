import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/compat/app";
import styles from "./style";

const useStyles = makeStyles(styles);
function ProfilePage() {
  const [state, setState] = useState({ user: firebase.auth().currentUser });
  const classes = useStyles();

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Your Profile</h2>

      <div className={classes.card}>
        <img src={state.user.photoURL} alt="John" style={{ width: "100%" }} />
        <h1>{state.user.displayName}</h1>
        <p className={classes.title}>CEO & Founder, Example</p>
        <p>Harvard University</p>
      </div>
    </div>
  );
}

export default ProfilePage;
