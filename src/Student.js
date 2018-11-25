import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import SpeechRecognition from 'react-speech-recognition';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';

import './App.css';

import AWS from 'aws-sdk';
// import awsmobile from './aws-exports';

AWS.config.update({
 region: 'eu-west-1', // Region
 credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:d8d0f4ad-37d2-4715-8dc2-1a052e2592c7',
}),
});

let lexRunTime = new AWS.LexRuntime()
let lexUserId = 'mediumBot' + Date.now()

class Student extends Component {

  
  constructor(){
    super()
    this.handleOnTextAreaChange = this.handleOnTextAreaChange.bind(this);
    this.state = {
      message: "",
      submit: "",
      history: [],
      textAreaValue: "Ask your question"
  }}

  handleOnTextAreaChange(event) {
    const value = event.target.value;
    this.setState({textAreaValue: value});
  }

  changeMessage = (e) => {
    this.setState({
      message: e.target.value
    })
  }

  submitMessage = () => {
    this.setState({
      submit: this.state.message
    })
    console.log("submitted")
    console.log(this.state.history)
    this.showRequest()
  }

  // Populates screen with user inputted message
  showRequest = () => {
    console.log(this.state.message)
    // Add text input to messages in state
    if (this.state.message !== ""){
    let oldMessages = Object.assign([], this.state.history)
    oldMessages.push({from: 'user', msg: this.state.message})
    this.setState({
        message: "",
        history: oldMessages
    })
    this.sendToLex()
  }
}
 
sendToLex = () => {
  let params = {
      botAlias: '$LATEST',
      botName: 'TutorialBot',
      inputText: this.state.message,
      userId: lexUserId,
  }

  lexRunTime.postText(params, (err, data) => {
    if(err) {
        // TODO SHOW ERROR ON MESSAGES
    }
    if (data) {
       this.showResponse(data)
    }
  })
  }
  
  showResponse(lexResponse) {
    console.log(lexResponse)
    let lexMessage = lexResponse.message
    let oldMessages = Object.assign([], this.state.history)
    oldMessages.push({from: 'bot', msg: lexMessage})
    this.setState({
        history: oldMessages,
        submit: ""
    })
}



  render(){ 
  
    const { params } = this.props.match
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props;

    return (
      <div className="App">
       <h1>How can I help?</h1> Message:
       <input type="text"/>
       <button onClick={this.submitMessage}>Submit</button>                 

        <h1>Class {params.code}, {params.name}</h1> Student
        <div>
          <button onClick={resetTranscript}>Reset</button>
          <span>{transcript}</span>
        </div>
        <ChatFeed
          messages={this.state.history} // Boolean: list of message objects
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
        <textarea className="chat__textArea"  onChange={ this.changeMessage } value={ this.state.message } />
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

{/* value={this.state.textAreaValue} onChange={this.handleOnTextAreaChange} */}