import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import axios from 'axios'
import LogInPage from './components/login/LogInPage'
import OfficePin from './components/officepin/OfficePin'
import Clock from './components/loggedin/Clock'
import Rosters from './components/Rosters_&_Timesheets/Rosters/Rosters'
import Timesheets from './components/Rosters_&_Timesheets/Timesheets/Main/Timesheets'
// import Header from './components/header/Header'
import Staff from './components/staff/Staff'
// import week from './data'
import './App.css';



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sideBarHeading: 'flags',
      users: '',
      week1: '',
      week2: '',
      week3: '',

    }

  }

  componentDidMount() {
    const server = 'http://localhost:4000'

    // Request all weeks
    axios.get(server + '/rosters').then(response => {

      this.setState({
        week1: response.data[0],
        week2: response.data[1],
        week3: response.data[2],

      })
    })

    axios.get(server + '/users').then(response => {

      this.setState({
        users: response.data,

      })
    })

    axios.get(server + '/payRateCategories').then(response => {
      this.setState({
        payRateCategories: response.data.payRateCategories,
      })
    })

    axios.get(server + '/entitlements').then(response => {
      this.setState({
        entitlements: response.data.entitlements,
      })
    })

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
    if (!(this.state.week1 && this.state.users
      && this.state.payRateCategories && this.state.entitlements
    )) return ''

    var week = this.state.week3

    return (
      <div>

        <Router>
          <div>

            <div className="navbar">
              <Link to="/rosters" onClick={this.selectRosters}>Rosters</Link>
              <Link to="/timesheets" onClick={this.selectTimesheets}>Timesheets</Link>
              <Link to="/staff">Staff</Link>
              <Link to="/">Logout</Link>
            </div>




            <Route path='/rosters' render={(routerprops) => (
              <Rosters  week={week}
                        nextWeek={this.nextWeek}
                        previousWeek={this.previousWeek}
                        sideBarHeading={this.state.sideBarHeading} /> )}
            />

            <Route path='/timesheets' render={(routerprops) => (
              <Timesheets week={week}
                          users={this.state.users}
                          payRateCategories={this.state.payRateCategories}
                          entitlements={this.state.entitlements}
                          nextWeek={this.nextWeek}
                          previousWeek={this.previousWeek}
                          sideBarHeading={this.state.sideBarHeading}

              /> )}
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
