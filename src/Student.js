import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import SpeechRecognition from 'react-speech-recognition';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';

import './App.css';

import AWS from 'aws-sdk';
import { fileURLToPath } from 'url';
import firebase from 'firebase';
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

  componentDidMount(){
    
  }
  
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
    this.setState({message: value});
  }

  changeMessage = (e) => {
    this.setState({
      message: e.target.value
    })
  }

  submitMessage = () => {
    this.setState({
      submit: this.state.message.trim()
    })
    console.log("submitted")
    this.showRequest()
  }

  // Populates screen with user inputted message
  showRequest = () => {
    // Add text input to messages in state
    if (this.state.message !== ""){
    let oldMessages = Object.assign([], this.state.history)
    oldMessages.push(new Message({id: 0, message: this.state.message}))
    this.setState({
        history: oldMessages
    })
    this.sendToLex()
    console.log(this.state)
  }
}
 
sendToLex = () => {
  let params = {
      botAlias: '$LATEST',
      botName: 'TutorialBot',
      inputText: this.state.message.trim(),
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

    console.log(this.state.message)
    console.log(lexResponse.message)
    
    let lexMessage = lexResponse.message
    let oldMessages = Object.assign([], this.state.history)
    oldMessages.push(new Message({id: 1, message: lexMessage}))
    this.setState({
        history: oldMessages,
        submit: "",
        message: "",
        text: ""
    })
}

// const Clicks = firebase.database().ref('banexams').child('clicks');

// Clicks.on('value', snap => {
//   this.setState ({
//     clicks: snap.val(),
//   })
// })
 

  componentDidMount(){
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }
  

  tick = () => { 
      const text = firebase.database().ref('transcript').child('transcript');
      console.log(text)
      text.on('value', snap => {
        this.setState ({
          text: snap.val(),
        })
      })
};

  render(){ 
  
    const { params } = this.props.match


    return (
      <div className="App">
       <h1>How can I help?</h1> Message:
       <input type="text" onChange={(e) => {this.setState({message: e.target.value})}}/>
       <button onClick={this.submitMessage}>Submit</button>                 

        <h1>{params.code} {params.name}</h1>

        <div id="usertranscript"> adwa {this.state.text} </div>
        
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
        {/* <textarea className="chat__textArea"  onChange={ (e) => this.setState({message: e.target.value}) } value={ this.state.message } /> */}
      </div>
    );
  }
}

export default Student;

{/* value={this.state.textAreaValue} onChange={this.handleOnTextAreaChange} */}