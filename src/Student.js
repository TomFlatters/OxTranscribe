import { Route, Link, BrowserRouter as Router} from 'react-router-dom';
import { RecyclerListView } from "recyclerlistview/web"

import React, { Component } from 'react';
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
    this.state = {
      message: "",
      submit: "",
      history: {},
  }}

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
    return (
      <div className="App">
       <h1>How can I help?</h1> Message:
       <input type="text" onChange={ this.changeMessage } value={ this.state.message } />
       <button onClick={this.submitMessage}>Submit</button>

        <div>

        </div>                      

      </div>
    );
  }
}

export default Student;
