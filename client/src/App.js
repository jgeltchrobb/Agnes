import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import axios from 'axios'
import LogInPage from './components/login/LogInPage'
import Clock from './components/clock/Clock'
import Rosters from './components/Rosters_&_Timesheets/Rosters/Rosters'
import Timesheets from './components/Rosters_&_Timesheets/Timesheets/Timesheets'
import Staff from './components/staff/Staff'
// import StaffHeader from './components/staff/Header'
import './stylesheets/App.css';

const api = 'http://localhost:4000/'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sideBarHeading: 'FLAGS',
      users: '',
      week1: '',
      week2: '',
      week3: '',
      week4: '',
      week5: '',
      week6: '',
      week7: '',
      currentWeek: '',
      staffData: [],
      payRateCategories: [],
      weeks: [],
      noRoster: false
    }

  }

  fetchShiftData = () => {
    axios.get(api + 'rosters/' + this.state.currentWeek._id).then((response) => {
      this.setState({
        currentWeek: response.data
      })
    })
  }

  componentDidMount() {
    const server = 'http://localhost:4000'

    // Request all weeks
    axios.get(server + '/rosters').then(response => {
      console.log(response, 'RESPONSE')
      this.setState({
        week1: response.data[0],
        week2: response.data[1],
        week3: response.data[2],
        week4: response.data[3],
        week5: response.data[4],
        week6: response.data[5],
        week7: response.data[6],
        currentWeek: response.data[0],
        weeks: [
          response.data[0],
          response.data[1],
          response.data[2],
          response.data[3],
          response.data[4],
          response.data[5],
          response.data[6],
        ]
      })
    })

    axios.get(server + '/rosters/all').then(response => {
      this.setState({
        week12: response.data[1],
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

    this.setState({ sideBarHeading: 'FLAGS' })
  }

  selectTimesheets = () => {

    this.setState({ sideBarHeading: 'staff' })
  }

  goToNextWeek = (date) => {
    if (this.state.currentWeek.date === this.state.weeks[0].date) {
      axios.get(api + 'rosters/' + 'new/' + this.state.currentWeek.date).then((response) => {
        let weeks = [...this.state.weeks]
        weeks.unshift(response.data)
        weeks.pop()
        this.setState({
          weeks: weeks,
          currentWeek: response.data
        })
      })
    } else {
      for (let week of this.state.weeks) {
        if (this.state.currentWeek.date === week.date) {
          let index = this.state.weeks.indexOf(week)
          this.setState({
            currentWeek: this.state.weeks[index - 1]
          })
        }
      }
    }
  }

  goToPreviousWeek = (date) => {
    if (!this.noRoster) {

    if (this.state.currentWeek.date === this.state.weeks[6].date) {
      axios.get(api + 'rosters/' + 'previous/' + this.state.currentWeek.date).then((response) => {
        let weeks = [...this.state.weeks]
        weeks.shift()
        weeks.push(response.data)
        if (response.data) {
          this.setState({
            weeks: weeks,
            currentWeek: response.data,
          })
        }
      })
    } else {
      for (let week of this.state.weeks) {
        if (this.state.currentWeek.date === week.date) {
          let index = this.state.weeks.indexOf(week)
          this.setState({
            currentWeek: this.state.weeks[index + 1]
          })
        }
      }
    }
  }

  }

  getStaffDataCallBack = (staffData) => {
    this.setState({staffData})
  }

  render() {
    console.log(this.state, 'STATE')
    if (!this.state.week1 || !this.state.users || !this.state.payRateCategories || !this.state.entitlements) {return ''}

    let week = this.state.currentWeek
    let prevWeek = this.state.weeks[this.state.weeks.indexOf(week) + 1]
    let user = this.state.users[3]
    return (
      <div>

        <Router>
          <div>

            <div className="navbar">
              <Link to="/rosters" onClick={ this.selectRosters }>Rosters</Link>
              <Link to="/timesheets" onClick={ this.selectTimesheets }>Timesheets</Link>
              <Link to="/staff">Staff</Link>
              <Link to="/">Logout</Link>
            </div>

            <Route path='/rosters' render={(routerprops) => (
              <Rosters  currentWeek={this.state.currentWeek} week={week}
                        users={this.state.users}
                        goToNextWeek={this.goToNextWeek}
                        goToPreviousWeek={this.goToPreviousWeek}
                        sideBarHeading={this.state.sideBarHeading}
                        fetchData={this.fetchShiftData}
                        /> )}
            />

            <Route path='/timesheets' render={(routerprops) => (
              <Timesheets currentWeek={ this.state.currentWeek }
                          week={ week }
                          prevWeek={ prevWeek }
                          users={ this.state.users }
                          payRateCategories={ this.state.payRateCategories }
                          entitlements={ this.state.entitlements }
                          goToNextWeek={ this.goToNextWeek }
                          goToPreviousWeek={ this.goToPreviousWeek }
                          sideBarHeading={ this.state.sideBarHeading }
              /> )}
            />

            <Route path='/staff' render={(routerProps) => {
              return (
                <Staff payRates={this.state.payRateCategories}/>
              )
            }} />

            <Route path='/clock' render={(routerProps) => {
              return (
                <Clock week={week} user={user}/>
              )
            }} />

            <Route path='/login' component={LogInPage} />



          </div>
        </Router>




      </div>
    );
  }
}

export default App;
