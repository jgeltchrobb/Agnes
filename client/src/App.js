import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import LogInPage from './components/login/LogInPage'
import OfficePin from './components/officepin/OfficePin'
import Clock from './components/loggedin/Clock'
import Rosters from './components/rosters/Rosters'
import Timesheets from './components/timesheets/Timesheets'
import Header from './components/header/Header'
import Staff from './components/staff/Staff'
import week from './data'
import './App.css';



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sideBarHeading: 'flags',
    }


  }

  selectRosters = () => {

    this.setState({ sideBarHeading: 'flags' })
  }

  selectTimesheets = () => {

    this.setState({ sideBarHeading: 'staff' })
  }


  nextWeek = () => {
    // updates state to be the next week,
    // retrieving from localstorage OR Just
    // iterate through state data to set this.state.week
  }

  previousWeek = () => {
    // updates state to be the next week,
    // retrieving from localstorage OR Just
    // iterate through state data to set this.state.week
  }

  render() {
    // const { week } = from database

    return (
      <div>

        <Router>
          <div>

            <div>
              <Link to="/rosters" onClick={this.selectRosters}>Rosters</Link>
            </div>

            <div>
              <Link to="/timesheets" onClick={this.selectTimesheets}>Timesheets</Link>
            </div>

            <div>
              <Link to="/staff">Staff</Link>
            </div>

            <div>
              Logout
            </div>

            <div>
              <Header
              weekDate={week.date}
              nextWeek={this.nextWeek}
              previousWeek={this.previousWeek}
              sideBarHeading={this.state.sideBarHeading}
              />
            </div>

            <Route path='/rosters' render={(routerprops) => (
              <Rosters staff={week.staff} /> )}
            />

            <Route path='/timesheets' render={(routerprops) => (
              <Timesheets week={week} /> )}
            />

            <Route path='/staff' component={Staff} />

            <Route path='/clock' component={Clock} />

            <Route path='/login' component={LogInPage} />

            <Route path='/pin' component={OfficePin} />

          </div>
        </Router>




      </div>
    );
  }
}

export default App;
