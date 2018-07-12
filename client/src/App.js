import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import axios from 'axios'
import LogInPage from './components/login/LogInPage'
import OfficePin from './components/officepin/OfficePin'
import Clock from './components/loggedin/Clock'
import Rosters from './components/rosters/Rosters'
import Timesheets from './components/timesheets/Timesheets'
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

    // axios.get(server + '/payRateCategories').then(response => {
    //   console.log(response.data)
    //   this.setState({
    //     payRateCategories: response.data[0].payRateCategories,
    //   })
    // })

    // axios.get(server + '/entitlements').then(response => {
    //   this.setState({
    //     entitlements: response.data[0].entitlements,
    //   })
    // })

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
      // && this.state.payRateCategories && this.state.entitlements
    )) return ''

    var week = this.state.week1

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


            <div>Logout</div>

          </div>
        </Router>




      </div>
    );
  }
}

export default App;
