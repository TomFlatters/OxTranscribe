import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase/app";


const config = {
    apiKey: "AIzaSyD4wkPo98h4Y8STVVGIXohAI2YN1SUH3ZY",
    authDomain: "oxhack-3b2b9.firebaseapp.com",
    databaseURL: "https://oxhack-3b2b9.firebaseio.com",
    projectId: "oxhack-3b2b9",
    storageBucket: "oxhack-3b2b9.appspot.com",
    messagingSenderId: "555795301658"
  };
  firebase.initializeApp(config);

  ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
