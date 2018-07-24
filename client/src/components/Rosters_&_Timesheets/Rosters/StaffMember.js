import React, { Component } from 'react'
import Day from './Day'
import axios from 'axios'
import '../../../stylesheets/StaffMember.css'

const api = 'http://localhost:4000'

class StaffMember extends Component {
  state = {
    staffName: '',
    daysArray: [],
    addShift: '',
    removeShiftVal: '',
    currentShiftDate: ''
  }

  componentDidMount = () => {
    const { weekDate, staffMember, staffID, users } = this.props
    this.setStaffName(staffID, users)
    this.setDaysArray(weekDate, staffMember)
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { weekDate, staffMember, staffID, users } = this.props
    if (this.props !== prevProps) {
      this.setStaffName(staffID, users)
      this.setDaysArray(weekDate, staffMember)
    }
  }

  setStaffName = (staffID, users) => {
    users.map((user) => {
      if (user._id.toString() === staffID) {
        this.setState({ staffName: user.name })
      }
    })
  }

  setDaysArray = (dateString, staffMember) => {
    const weekDate = new Date(dateString)
    const daysArray = []
    // daysArray has a 'shifts' obj for each day of the week, which allows multiple shifts per day
    for (let i = 0; i < 7; i++) {
      // loop through days of the week
      let dayPushed = 'no'
      let shiftPushed = false
      staffMember.shifts.map((shift) => {
        // for every day loop through shifts looking for shift date matching days date
        if ( (weekDate.getDate() + i) === new Date(shift.date).getDate() ) {
          // loop through daysArray to see if any shifts already added for this date
          for (let day of daysArray) {
            if (day && new Date(day.shifts[0].date).getDate() === weekDate.getDate() + i) {
              // if so push the shift to that shifts obj
              day.shifts.push ( {
                                  shiftID: shift._id,
                                  date: new Date(shift.date),
                                  shiftCategory: shift.shiftCategory,
                                  start: new Date(shift.start.rostered),
                                  finish: new Date(shift.finish.rostered),
                                },
                              )
              shiftPushed = true
              dayPushed = 'yes'
            }
          }
          // if not push the shift in a new shift obj to the daysArray
          if (!shiftPushed) {
            daysArray.push  ( {
                                shifts: [
                                          {
                                            shiftID: shift._id,
                                            date: new Date(shift.date),
                                            shiftCategory: shift.shiftCategory,
                                            start: new Date(shift.start.rostered),
                                            finish: new Date(shift.finish.rostered),
                                          },
                                        ]
                              }
                            )
            dayPushed = 'yes'
          }
        }
      })
      // if no shift date matches the days date push an empty shift object to daysArray
      if (dayPushed === 'no') {
        let dateCopy = new Date(weekDate)
        daysArray.push( {
                          shifts: [
                                    {
                                      date: new Date(dateCopy.setDate(weekDate.getDate() + i)),
                                      shiftCategory: '',
                                      start: '',
                                      finish: '',
                                    },
                                  ]
                        }
                      )
      }
    }
    this.setState({ daysArray: daysArray })
  }

  addShift = (day) => {
    if (day.shifts.length < 3) {
      this.setState({
        addShift: true,
        currentShiftDate: day.shifts[0].date
      })
    } else {
      this.setState({
        addShift: false
      })
    }
  }

  stopAdd = () => {
    this.setState({
      addShift: false
    })
  }

  removeShift = (staffID, shiftID) => {
    let daysArray = this.state.daysArray
    if (shiftID) {
      axios.post(api + '/rosters/' + 'shift/' + 'remove/' + shiftID, {staffID: staffID, weekID: this.props.weekID}).then((response) => {
      })
      for (let day of daysArray) {
        for (let shift of day.shifts) {
          if (shiftID === shift.shiftID) {
            if (day.shifts.length > 1) {
              day.shifts.splice(day.shifts.indexOf(shift), 1)
            } else {
              day.shifts.splice(day.shifts.indexOf(shift), 1, {
                date: '',
                shiftCategory: '',
                start: '',
                finish: ''
              })
            }
          }
        }
      }
    }
    this.setState({
      removeShiftVal: true,
      daysArray
    })
  }

  checkShiftTimes = (start, finish, date, shiftID) => {
    let daysArray = this.state.daysArray
    let day = ''
    if (date.getDay() === 0) {
      day = 6
    } else {
      day = date.getDay() - 1
    }
    let shiftAllowed = false
    for (let shift of daysArray[day].shifts) {
      if (daysArray[day].shifts.length > 2) {
        shiftAllowed = false
      }
      if (shift.date.toISOString().split('T')[0] === date.toISOString().split('T')[0]) {
        if (!shift.start || !shift.finish) {
          shiftAllowed = true
        } else {
          let startHours = start.getHours()
          let finishHours = finish.getHours()
          let oldFinishHours = shift.finish.getHours()
          let oldStartHours = shift.start.getHours()

          let startMinutes = start.getMinutes()
          let finishMinutes = finish.getMinutes()
          let oldFinishMinutes = shift.finish.getMinutes()
          let oldStartMinutes = shift.start.getMinutes()

          let startHourDiff = start - shift.start.getHours()
          let startMinDiff = start.getMinutes() - shift.start.getMinutes()

          let finishHourDiff = finish - shift.finish.getHours()
          let finishMinDiff = finish.getMinutes() - shift.finish.getMinutes()

          if (startHours < oldStartHours && finishHours < oldStartHours) {
            shiftAllowed = true
          } else if (startHours > oldFinishHours && finishHours > oldFinishHours) {
            shiftAllowed = true
          } else if (startHours < oldStartHours && finishHours > oldFinishHours) {
            shiftAllowed = false
          } else {
            if (startHours >= oldStartHours) { shiftAllowed = false }
            else if (finishHours <= oldFinishHours) { shiftAllowed = false }
            else {
              shiftAllowed = true
            }
          }
        }
      }
    }
    if (shiftAllowed) {
      return true
    } else {
      return false
    }
  }

  render() {
    const { role, weekID, staffID } = this.props
    if (!this.state.daysArray && !this.state.staffName) { return '' }
    console.log(this.state.daysArray)
    return (
      <div className="shift-row">

        <div className="shifts">

          <div>
            <h3>{this.state.staffName}</h3>
          </div>
          {
            this.state.daysArray.map((day) => {
              return (
                <div class='shift-cell'>
                  <Day shifts={ day.shifts }
                      staffID={ staffID }
                      weekID={ weekID }
                      fetchData={this.props.fetchData}
                      addShift={this.state.addShift}
                      currentWeek={this.props.currentWeek}
                      stopAdd={this.stopAdd}
                      currentShiftDate={this.state.currentShiftDate}
                      removeShift={this.removeShift}
                      removeShiftVal={this.state.removeShiftVal}
                      checkShiftTimes={this.checkShiftTimes}
                  />
              {
                (role !== 'admin') ? '' :
                <button id='add-shift-btn' onClick={() => this.addShift(day)} >Add Shift</button>
              }
                </div>
              )
            })
          }
        </div>

      </div>
    )

  }
}

export default StaffMember
