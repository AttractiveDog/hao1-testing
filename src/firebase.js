import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

firebase.initializeApp({
  apiKey: "AIzaSyBsVlal-WQ5lkwZjUv2Fzf4RMNSLui3NOc",
  authDomain: "cochat-335817.firebaseapp.com",
  projectId: "cochat-335817",
  storageBucket: "cochat-335817.appspot.com",
  messagingSenderId: "757276988213",
  appId: "1:757276988213:web:27a1c1054f11442390327c",
  measurementId: "G-SW78GC2Y4L"
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const GithubAuthProvider = new firebase.auth.GithubAuthProvider();
const TwitterAuthProvider = new firebase.auth.TwitterAuthProvider();

export {
  db,
  auth,
  storage,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider
};
