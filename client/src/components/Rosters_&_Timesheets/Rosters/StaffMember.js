import React, { Component } from 'react'
import Day from './Day'
import '../../../stylesheets/StaffMember.css'

class StaffMember extends Component {
  state = {
    staffName: '',
    daysArray: [],
    addShift: '',
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
                                      shiftCategory: 'empty',
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

    // let days = [...this.state.daysArray]
    // console.log(days, 'days')
    // let day = new Date(shift.date).getDay() - 1
    // if (day === -1) {day = 6}
    if (day.shifts.length < 3) {
      this.setState({
        addShift: true,
        currentShiftDate: day.shifts[0].date
      })
    //   days[day].shifts.push(shift)
    } else {
      this.setState({
        addShift: false
      })
    }

    // this.setState({
    //   daysArray: days
    // })
  }

  stopAdd = () => {
    this.setState({
      addShift: false
    })
  }

  render() {
    const { weekID, staffID } = this.props
    if (!this.state.daysArray && !this.state.staffName) { return '' }
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
                  />
                  <button id='add-shift-btn' onClick={() => this.addShift(day)} >Add Shift</button>
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
