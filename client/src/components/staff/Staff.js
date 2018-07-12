import React, { Component } from 'react'
import StaffRow from './StaffRow'
import SideBar from './SideBar'
import axios from 'axios'

const api = 'http://localhost:4000'


class Staff extends Component {
  constructor() {
    super()
    this.state = {
      revealed: '',
      staffData: [],
      staffRoster: []
    }
  }

  clickHandler = (event) => {
    if (this.state.revealed === event.target.getAttribute('name') || this.state.revealed === event.target.innerText) {
      this.setState({revealed: ''})
    } else {
      this.setState({
        revealed: event.target.getAttribute('name') || event.target.innerText
      })
    }
  }

  fetchStandard = () => {
    axios.get(api + '/standardHours').then((response) => {
      for (let staff of response.data) {
        staff.totalHours = parseInt(localStorage.getItem(`${staff.name}`))
      }
      return response
    }).then((result) => {
      this.setState({staffData: result.data})
    })
  }

  fetchRosters = () => {
    axios.get(api + '/rosters').then((response) => {
      for (let obj of response.data) {
        if (obj.date === '2018-07-01T14:00:00.000Z') {
          return obj
        }
      }
    }).then((obj) => {
      this.setState({staffRoster: obj})
    }).then(() => {
      this.calcRosters()
    })
  }

  calcRosters = () => {
    // {staffID: , }
    for (let staff of this.state.staffRoster.staff) {
      console.log(staff)
      for (let shift of staff.shifts) {
        console.log(shift.start.rostered, 'aaa')
        console.log(shift.finish.rostered - shift.start.rostered)
      }
    }
  }
  
  passTotal = (total) => {
    let name = ''
    let currentTotal = ''
    let plus = ''
    let diff = ''
    let staffData = [...this.state.staffData]
    if (total.orgHours < total.hours) {
      plus = true
      diff = total.hours - total.orgHours
    } else if (total.orgHours > total.hours) {
      plus = false
      diff = total.hours - total.orgHours
    } else {
      plus = null
      diff = total.orgHours
    }
    for (let obj of staffData) {
      if (obj._id === total.standardID) {
        name = obj.name
        currentTotal = parseInt(localStorage.getItem(`${name}`))
        for (let cat of obj.categories) {
          if (cat._id === total.id) {
            cat.hoursWorked = total.hours
            if (plus) {
              currentTotal = currentTotal + diff
            } else if (plus === false) {
              currentTotal = currentTotal + diff
            }
          }
        }
      }
    }
    localStorage.setItem(`${name}`, currentTotal)
    this.setState({staffData})
  }

  componentDidMount() {
    this.fetchStandard()
    this.fetchRosters()
  }
  
  render() {
    console.log(this.state.staffRoster, 'rosters')
    return (
      <div className="staff-container" >
        <SideBar staffRoster={this.state.staffRoster} staffData={this.state.staffData} handleClick={this.clickHandler} revealed={this.state.revealed} fetchStandard={this.fetchStandard} />
        <div className="staff-row-container" >
          <StaffRow staffData={this.state.staffData} revealed={this.state.revealed} fetchStandard={this.fetchStandard} passTotal={this.passTotal} />
        </div>
      </div>
    )
  }
}

export default Staff