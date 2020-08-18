import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCtjldTUTUmNXnN6aWE4HUljdaJoNcPsV4",
  authDomain: "cp-todo-app.firebaseapp.com",
  databaseURL: "https://cp-todo-app.firebaseio.com",
  projectId: "cp-todo-app",
  storageBucket: "cp-todo-app.appspot.com",
  messagingSenderId: "858480904911",
  appId: "1:858480904911:web:306a8a54a8526b0f3685ba",
  measurementId: "G-42E0X2RTQY",
});

const db = firebaseApp.firestore();

export default db;
