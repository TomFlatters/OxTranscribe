import { Route, Link, BrowserRouter as Router} from 'react-router-dom';

import React, { Component } from 'react';
import './App.css';

class Student extends Component {
  render() {
    const { params } = this.props.match
    return (
      <div className="App">
       <h1>Class {params.code}, {params.name}</h1> Student
      </div>
    );
  }
}

export default Student;
