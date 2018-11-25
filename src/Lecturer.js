import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import SpeechRecognition from 'react-speech-recognition';
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import './App.css';

import AWS from 'aws-sdk';
import firebase from 'firebase';

AWS.config.update({
  region: 'eu-west-1', // Region
  credentials: new AWS.CognitoIdentityCredentials({
     IdentityPoolId: 'eu-west-1:d8d0f4ad-37d2-4715-8dc2-1a052e2592c7',
 }),
 });
 

class Lecturer extends Component {
 
  componentDidUpdate(){
    firebase.database().ref("transcript").set({transcript: this.props.transcript});

  }

  render() {

    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props;

    return (

      <div className="App">
        Lecturer
        <div>
          <span>{transcript}</span>
          <br/>
          <button onClick={ () => { firebase.database().ref("transcript").set({transcript: transcript})} }> Send</button>;

          <button onClick={resetTranscript}>Reset</button>

        </div>
      </div>
    );
  }
}

Lecturer.propTypes = {
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

export default SpeechRecognition(Lecturer);
