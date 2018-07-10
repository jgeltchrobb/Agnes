import React, { Component } from 'react';
import RostersPage from './components/roster/RostersPage'
import LogInPage from './components/login/LogInPage'
import OfficePin from './components/officepin/OfficePin'
import Clock from './components/loggedin/Clock'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>

        <div>
          <Clock />
        </div>

      </div>
    );
  }
}

export default App;
