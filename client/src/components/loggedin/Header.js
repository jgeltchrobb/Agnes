import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Header extends Component {

  render() {
    return(
      <Router>
        <div>
          <nav>
          <Link to="/roster">Roster</Link>
          <Link to="/timesheet">Timesheet</Link>
          <Link to="/logout">Logout</Link>
          </nav>
        </div>
      </Router>
    )
  }
}

export default Header
