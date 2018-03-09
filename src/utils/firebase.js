import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAmP9nDLst9gE4Pyc1rDHrOzI42CAeGItc",
  projectId: "github-repo-9bf33",
  authDomain: "github-repo-9bf33.firebaseapp.com",
  databaseURL: "https://github-repo-9bf33.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "747369792985"
};

firebase.initializeApp(config);

export default firebase;
