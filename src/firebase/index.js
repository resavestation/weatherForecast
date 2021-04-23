import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
const config = {
  apiKey: "AIzaSyC6JvZP_9Yy9VzJrGvljO_T83iABoCeZ14",
  authDomain: "weatherforecast-d9b0e.firebaseapp.com",
  projectId: "weatherforecast-d9b0e",
  storageBucket: "weatherforecast-d9b0e.appspot.com",
  messagingSenderId: "990885420483",
  appId: "1:990885420483:web:ee0770a98e794623b73176",
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const auth = firebase.auth();
const AppContext = React.createContext();
const { Provider } = AppContext;

export const AuthorizedFirebase = (props) => (
  <Provider value={auth}>{props.children}</Provider>
);
