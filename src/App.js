import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router} from 'react-router-dom';
import './App.css';

import Home from './Home'
import Lecturer from './Lecturer'
import Student from './Student'
import Nav from './Nav'


class App extends Component {
  render() {
    return (
      <div className="App">
        
        <Router>
          <div>
            <Route path="/" component={Nav} />
            <Route exact path="/" component={Home} />
            <Route path="/student" component={Student} />
            <Route path="/lecturer" component={Lecturer} />
          </div>
        </Router>

      </div>
    );
  }
}

export default App;

ReactDOM.render(<App/>, document.getElementById('root'))

