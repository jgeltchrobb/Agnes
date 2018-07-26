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
      // week1: '',
      // week2: '',
      // week3: '',
      // week4: '',
      // week5: '',
      // week6: '',
      // week7: '',
      currentWeek: '',
      clockWeek: '',
      staffData: [],
      payRateCategories: [],
      weeks: [],
      noRoster: false
    }
  }

  componentDidMount() {
    this.fetchWeeks('2018-07-23T00:00:00Z')

    axios.get(api + 'users').then(response => {
      this.setState({
        users: response.data,
      })
    })
    axios.get(api + 'payRateCategories').then(response => {
      this.setState({
        payRateCategories: response.data.payRateCategories,
      })
    })
    axios.get(api + 'entitlements').then(response => {
      this.setState({
        entitlements: response.data.entitlements,
      })
    })
  }
// fetch
  fetchShiftData = (weekID) => {
    let weeks = this.state.weeks
    if (weeks) {
      for (let week of weeks) {
        if (week) {
          if (weekID === week._id) {
            axios.get(api + 'rosters/all/' + weekID).then((response) => {
              let weeks = []
              for (let i=0; i<response.data.length; i++) {
                weeks.push(response.data[i])
              }
              this.setState({
                weeks: weeks,
                currentWeek: weeks[0],
              })
            })
          }
        }
      }
    }
  }

// get week by date and previous 6. That way app will stay on current week and just make it week[0] of the response
  fetchWeeks = (date) => {
    axios.get(api + `rosters/update/${date}`).then(response => {
      let weeks = []
      for (let i=0; i<response.data.length; i++) {
        weeks.push(response.data[i])
      }
      this.setState({
        currentWeek: weeks[0],
        clockWeek: weeks[0],
        weeks: weeks,
      })
    })
  }

  // refreshWeeks = () => {
  //   axios.get(api + 'rosters/refresh').then(response => {
  //     let weeks = []
  //     for (let i=0; i<response.data.length; i++) {
  //       weeks.push(response.data[i])
  //     }
  //     this.setState({
  //       weeks: weeks,
  //       currentWeek: weeks[0],
  //       clockWeek: weeks[0],
  //     })
  //   })
  // }

  // this will only work for a week so needs to be changed to get the week by todays date
  // clockUpdateCurrentWeek = () => {
  //   axios.get(api + 'rosters/' + weekID).then(response => {
  //     this.setState({ clockWeek: response.data })
  //   })
  // }

  selectRosters = () => {
    this.setState({ sideBarHeading: 'FLAGS' })
  }
  selectTimesheets = () => {
    this.setState({ sideBarHeading: 'STAFF' })
  }
// returns next week in db or creates one then sets current week to weeks[0]
  goToNextWeek = () => {
    let weeks = this.state.weeks
    if (this.state.currentWeek.date === weeks[0].date) {
      axios.get(api + 'rosters/' + 'next/' + this.state.currentWeek.date).then((response) => {
        weeks = [...weeks]
        weeks.unshift(response.data)
        weeks.pop()
        this.setState({
          weeks: weeks,
          currentWeek: weeks[0]
        })
      })
    } else {
      for (let week of weeks) {
        if (this.state.currentWeek.date === week.date) {
          let index = weeks.indexOf(week)
          this.setState({
            currentWeek: weeks[index - 1]
          })
        }
      }
    }
  }

  goToPreviousWeek = () => {
    let weeks = this.state.weeks
    if (this.state.currentWeek.date === weeks[5].date) {
      axios.get(api + 'rosters/' + 'previous/' + this.state.currentWeek.date).then((response) => {
console.log(response.data)
        weeks = [...weeks]
        weeks.shift()
        weeks.push(response.data)
        if (response.data) {
          this.setState({
            weeks: weeks,
            currentWeek: weeks[5],
          })
        }
      })
    } else {
      let weeks = this.state.weeks
      for (let i=0; i<weeks.length; i++) {
        if (this.state.currentWeek.date === weeks[i].date) {
          if (weeks[i + 2]) {
            this.setState({ currentWeek: weeks[i + 1] })
          } else { return }
        }
      }
    }
  }

  render() {
    if (!this.state.weeks || !this.state.currentWeek || !this.state.users || !this.state.payRateCategories || !this.state.entitlements || !this.state.clockWeek) {return ''}
    // this is to simulate user authenication (roles) - switch between the following three statements
    let role = 'admin'
    // let role = 'staff'
    // let role = 'office-clock'
    let prevWeek = this.state.weeks[this.state.weeks.indexOf(this.state.currentWeek) + 1]
    // this is to simulate a staff member login - switch between the following two statements
    let staffUser = ''
    // let staffUser = this.state.users[0]
    return (
      <div>

        <Router>
          <div>


              <div className="navbar">
                <Link to="/rosters" onClick={ this.selectRosters }>Rosters</Link>
                <Link to="/timesheets" onClick={ this.selectTimesheets }>Timesheets</Link>
          {    (role !== 'admin') ? '' :
                  <Link to="/staff">Staff</Link> }
          {    (role === 'office-clock') ? '' :
                  <Link to="/">Logout</Link>     }

              </div>



            <Route path='/rosters' render={(routerprops) => (
              <Rosters  currentWeek={ this.state.currentWeek }
                        weeks={ this.state.weeks }
                        users={ this.state.users }
                        goToNextWeek={ this.goToNextWeek }
                        goToPreviousWeek={ this.goToPreviousWeek }
                        sideBarHeading={ this.state.sideBarHeading }
                        fetchData={ this.fetchShiftData }
                        role={ role }
                        /> )}
            />

            <Route path='/timesheets' render={(routerprops) => (
              <Timesheets week={ this.state.currentWeek }
                          prevWeek={ prevWeek }
                          fetchWeeks={ this.fetchWeeks }
                          users={ this.state.users }
                          payRateCategories={ this.state.payRateCategories }
                          entitlements={ this.state.entitlements }
                          goToNextWeek={ this.goToNextWeek }
                          goToPreviousWeek={ this.goToPreviousWeek }
                          sideBarHeading={ this.state.sideBarHeading }
                          role={ role }
                          staffUser={ staffUser }

              /> )}
            />

            <Route path='/staff' render={(routerProps) => {
              return (
                <Staff payRates={ this.state.payRateCategories }/>
              )
            }} />

            <Route path='/clock' render={(routerProps) => {
              return (
                <Clock  week={ this.state.currentWeek }
                        user={ staffUser }
                        users={ this.state.users }
                        api={ api }
                        fetchWeeks={ this.fetchWeeks }
                />
              )
            }} />

            <Route path='/login' component={ LogInPage } />



          </div>
        </Router>




      </div>
    );
  }
}

export default App;
