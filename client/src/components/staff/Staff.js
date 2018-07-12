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
      staffRoster: [],
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
    let staffRoster = []
    let totalsRow = {}
    const DayShiftDefinitionClockinBeforeHours = 20
    const milliToHours = 0.00000027777777777778
    for (let staff of this.state.staffRoster.staff) {
      for (let shift of staff.shifts) {
        let finish = new Date(shift.finish.rostered)
        let start = new Date(shift.start.rostered)
        const shiftHours = (Number(((finish - start) * milliToHours).toFixed(2)))
        if (!shift.publicHoliday) {

          if (start.getHours() < DayShiftDefinitionClockinBeforeHours) {

            if (start.getDay() === 6) {
              if (shift.wayneShift) {
                totalsRow['Wayne Sat'] ? totalsRow['Wayne Sat'] += shiftHours : totalsRow['Wayne Sat'] = shiftHours
              } else {
                totalsRow['Sat'] ? totalsRow['Sat'] += shiftHours : totalsRow['Sat'] = shiftHours
              }
            } else if (start.getDay() === 0) {
                if (shift.wayneShift) {
                  totalsRow['Wayne Sun'] ? totalsRow['Wayne Sun'] += shiftHours : totalsRow['Wayne Sun'] = shiftHours
                } else {
                  totalsRow['Sun'] ? totalsRow['Sun'] += shiftHours : totalsRow['Sun'] = shiftHours
                }
            } else {
                if (shift.wayneShift) {
                  totalsRow['Wayne Ordinary'] ? totalsRow['Wayne Ordinary'] += shiftHours : totalsRow['Wayne Ordinary'] = shiftHours
                } else {
                  totalsRow['Ordinary'] ? totalsRow['Ordinary'] += shiftHours : totalsRow['Ordinary'] = shiftHours
                }
            }
          } else {
              if (shift.wayneShift) {
                totalsRow['Wayne Night'] ? totalsRow['Wayne Night'] += shiftHours : totalsRow['Wayne Night'] = shiftHours
              } else {
                totalsRow['Night'] ? totalsRow['Night'] += shiftHours : totalsRow['Night'] = shiftHours
              }
          }
        } else if (shift.publicHoliday && shift.wayneShift) {
          totalsRow['Wayne Public Holiday'] ? totalsRow['Wayne Public Holiday'] += shiftHours : totalsRow['Wayne Public Holiday'] = shiftHours

        } else {
          totalsRow['Public Holiday'] ? totalsRow['Public Holiday'] += shiftHours : totalsRow['Public Holiday'] = shiftHours
        }
      }
      for (let obj of this.state.staffData) {
        if (obj.staffID === staff.staffID) {
          staffRoster.push({...obj, rostered: {...totalsRow}, staffID: staff.staffID})
        }
      }
    }
    this.setState({staffData: staffRoster})
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

  componentWillMount() {
    this.fetchStandard()
    this.fetchRosters()
  }
  
  render() {
    console.log(this.state.staffData, 'rosters')
    return (
      <div className="staff-container" >
        <SideBar staffData={this.state.staffData} handleClick={this.clickHandler} revealed={this.state.revealed} fetchStandard={this.fetchStandard} />
        <div className="staff-row-container" >
          <StaffRow staffData={this.state.staffData} revealed={this.state.revealed} fetchStandard={this.fetchStandard} passTotal={this.passTotal} />
        </div>
      </div>
    )
  }
}

export default Staff