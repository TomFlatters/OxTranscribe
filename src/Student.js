import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import SpeechRecognition from 'react-speech-recognition';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';

import './App.css';

class Student extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [
        new Message({ id: 1, message: "I'm the recipient! (The person you're talking to)", }), // Gray bubble
        new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
        new Message({ id: 20, message: "I'm you -- the blue bubble!" }), // Blue bubble
        new Message({ id: 30, message: "sadjknajdnajdnaksndjaksndkjasndjkan ausdiuasbdiua biuda iuh uaihdu iash diuahsdiu ash diuah uia huiahd uiahd uaiddsjfndsjfnjksdnfjdksnfkj" }), // Blue bubble
        new Message({ id: 40, message: "I'm you -- the blue bubble!" }), // Blue bubble
        new Message({ id: 50, message: "I'm you -- the blue bubble!" }), // Blue bubble
        new Message({ id: 60, message: "I'm you -- the blue bubble!" }), // Blue bubble
      ],
      textAreaValue: "Ask your question"
    };

    this.handleOnTextAreaChange = this.handleOnTextAreaChange.bind(this);
  }

  handleOnTextAreaChange(event) {
    const value = event.target.value;
    this.setState({textAreaValue: value});
  }

  render() {
    const { params } = this.props.match;
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props;

    return (
      <div className="App">
        <h1>Class {params.code}, {params.name}</h1> Student
        <div>
          <button onClick={resetTranscript}>Reset</button>
          <span>{transcript}</span>
        </div>
        <ChatFeed
          messages={this.state.messages} // Boolean: list of message objects
          isTyping={this.state.is_typing} // Boolean: is the recipient typing
          hasInputField={false} // Boolean: use our input, or use your own
          showSenderName // show the name of the user who sent the message
          bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
          // JSON: Custom bubble styles
          bubbleStyles={
            {
              text: {
                fontSize: 30
              },
              chatbubble: {
                borderRadius: 70,
                padding: 40
              }
            }
          }
        />
        <textarea className="chat__textArea" value={this.state.textAreaValue} onChange={this.handleOnTextAreaChange}/>
      </div>
    );
  }
}

Student.propTypes = {
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

export default SpeechRecognition(Student);
