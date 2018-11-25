import { Route, Link, BrowserRouter as Router} from 'react-router-dom';

import React, { Component } from 'react';
import './App.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        I am a ....................
        <Link to='/lecturer'>Lecturer</Link>
        <br/>
        <Link to='/student'>Student</Link>
      </div>
    );
  }
}

export default Home;

