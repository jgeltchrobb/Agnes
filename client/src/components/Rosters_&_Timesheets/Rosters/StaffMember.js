import React, { Component } from 'react'
import Day from './Day'
import '../../../stylesheets/StaffMember.css'

class StaffMember extends Component {
  state = {
    staffName: '',
    daysArray: '',
  }

  componentDidMount = () => {
    const { weekDate, staffMember, staffID, users } = this.props
    this.setStaffName(staffID, users)
    this.setdaysArray(weekDate, staffMember)
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props !== prevProps) {
      const { weekDate, staffMember, staffID, users } = this.props
      this.setStaffName(staffID, users)
      this.setdaysArray(weekDate, staffMember)
    }
  }

  setStaffName = (staffID, users) => {
    users.map((user) => {
      if (user.staffID.toString() === staffID) {
        this.setState({ staffName: user.name })
      }
    })
  }

  setdaysArray = (dateString, staffMember) => {
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
    // console.log(daysArray)
    this.setState({ daysArray: daysArray })
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
                <Day  shifts={ day.shifts }
                      staffID={ staffID }
                      weekID={ weekID }

                />
              )
            })
          }
        </div>

      </div>
    )

  }
}

export default StaffMember
