import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./style.js";
import { db } from "../../firebase";
import firebase from "firebase/compat/app";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LikePanel from "../../components/LikePanel/index.js";

const useStyles = makeStyles(styles);

function Postpage() {
  const classes = useStyles();

  return (
    <div className={classes.post}>
      <h1>hello</h1>
    </div>
  );
}

export default Postpage;
