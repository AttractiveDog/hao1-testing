import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./style";
import { useParams } from "react-router-dom";
import { useStateValue } from "./stateProvider";

const useStyles = makeStyles(styles);
function Underdevpage() {
  const classes = useStyles();
  const { userid } = useParams();
  const [posts, setPosts] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  return (
    <div>
      <strong>lol</strong>
    </div>
  );
}

export default Underdevpage;
