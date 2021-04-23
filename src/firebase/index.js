import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
const config = {};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const auth = firebase.auth();
const AppContext = React.createContext();
const { Provider } = AppContext;

export const AuthorizedFirebase = (props) => (
  <Provider value={auth}>{props.children}</Provider>
);
