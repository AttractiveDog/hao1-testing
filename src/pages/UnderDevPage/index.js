import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, IconButton, Grid, Hidden, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  HomeRounded,
  AssistantRounded,
  AddCircleRounded,
  ExploreRounded,
  AccountCircleRounded,
  ExitToAppRounded
} from "@material-ui/icons";
import firebase from "firebase/compat/app";
import styles from "./style";
import { lightTheme, darkTheme } from "../../theme";
import { auth } from "../../firebase";

const useStyles = makeStyles(styles);
function Sidebar({
  user,
  isLightTheme,
  setIsLightTheme,
  setOpenSignIn,
  setOpenSignUp
}) {
  const classes = useStyles();
  const history = useHistory();
  const [pageSelected, setPageSelected] = useState({
    home: false,
    about: false,
    upload: false,
    explore: false,
    profile: false
  });

  var delayInMilliseconds = 1000; //1 second

  setTimeout(function () {
    //your code to be executed after 1 second
  }, delayInMilliseconds);
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
    } else {
      // No user is signed in.
    }
  });
  const [state, setState] = useState({ user: firebase.auth().currentUser });

  const getSelectedStyle = (selected) => {
    if (isLightTheme)
      return selected
        ? lightTheme.palette.text.primary
        : lightTheme.palette.text.secondary;
    else
      return selected
        ? darkTheme.palette.text.primary
        : darkTheme.palette.text.secondary;
  };

  const setSelected = () => {
    const tempSelected = pageSelected;
    for (let i in tempSelected) tempSelected[i] = false;

    switch (window.location.pathname) {
      case "/home":
        tempSelected.home = true;
        break;
      case "/about":
        tempSelected.about = true;
        break;
      case "/upload":
        tempSelected.upload = true;
        break;
      case "/explore":
        tempSelected.explore = true;
        break;
      case "/profile":
        tempSelected.profile = true;
        break;
      default:
        console.log("404");
    }
    setPageSelected({ ...tempSelected });
  };

  useEffect(() => {
    setSelected();
    return history.listen(() => {
      setSelected();
    });
  }, []);

  return (
    <div>
      <strong>lol</strong>
    </div>
  );
}

export default Sidebar;
