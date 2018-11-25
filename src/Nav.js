
import React, { Component } from 'react';
import './App.css';
import { Route, Link, BrowserRouter as Router} from 'react-router-dom';

class Nav extends Component {

    render(){
        
    return(
    
    <div className="nav">

        <div className="navspace">
        <Link style={{ textDecoration: 'none',
                        color: "white" }} to="/">
        Transcribe
        </Link>
        </div>
      
      <div className="nav2">
      
        <div className="navspace" >
        <Link style={{ textDecoration: 'none',
                        color: "white" }} 
                        to="/student">
        Students
        </Link>
        </div>
        
        <div className="navspace" >
        <Link style={{ textDecoration: 'none',
                        color: "white" }} to="/lecturer">
        Lecturers/Teachers
        </Link>
        </div>

      </div>

      </div>

    )
    }
}

export default Nav