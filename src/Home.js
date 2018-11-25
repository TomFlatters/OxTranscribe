import { Route, Link, BrowserRouter as Router} from 'react-router-dom';

import React, { Component } from 'react';
import './App.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
      <div className="homebox lecturers">
        <Link style={{ textDecoration: 'none',
                        color: "white" }} to='/lecturer'>Lecturers</Link>
      </div>
      <div className="homebox students">
        <Link style={{ textDecoration: 'none',
                        color: "white" }} to='/student'>Students</Link>
      </div>
      </div>
    );
  }
}

export default Home;

