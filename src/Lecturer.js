import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import React, { Component } from 'react';
import './App.css';

class Lecturer extends Component {


  render() {

    // status fields and start button in UI
  var phraseDiv;
  var startRecognizeOnceAsyncButton;

  // subscription key and region key for speech services.
  var subscriptionKey, regionKey;
  var authorizationToken;
  var SpeechSDK;
  var recognizer;

  
    startRecognizeOnceAsyncButton = true;
    subscriptionKey.value = "783c4377b37d4eb8b6d72615c8938426";
    regionKey.value = "uswest";
    phraseDiv = "";
    startRecognizeOnceAsyncButton.addEventListener("click", function () {
      startRecognizeOnceAsyncButton.disabled = true;
      phraseDiv.innerHTML = "";

      // if we got an authorization token, use the token. Otherwise use the provided subscription key
      var speechConfig;
      if (authorizationToken) {
        speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(authorizationToken, regionKey.value);
      } else {
        if (subscriptionKey.value === "" || subscriptionKey.value === "subscription") {
          alert("Please enter your Microsoft Cognitive Services Speech subscription key!");
          return;
        }
        speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey.value, regionKey.value);
      }

      speechConfig.speechRecognitionLanguage = "en-US";
      var audioConfig  = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
      recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

      recognizer.recognizeOnceAsync(
        function (result) {
          startRecognizeOnceAsyncButton.disabled = false;
          phraseDiv.innerHTML += result.text;
          window.console.log(result);

          recognizer.close();
          recognizer = undefined;
        },
        function (err) {
          startRecognizeOnceAsyncButton.disabled = false;
          phraseDiv.innerHTML += err;
          window.console.log(err);

          recognizer.close();
          recognizer = undefined;
        });
    });

  
    return (
      <div>

      <script src="microsoft.cognitiveservices.speech.sdk.bundle.js"></script>

      <div className="App">
        Lecturer
      </div>
      </div>
    );
  }
}

export default Lecturer;
