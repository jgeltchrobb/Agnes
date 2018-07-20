import React, { Component } from 'react'
import Day from './Day'
import axios from 'axios'
import '../../../stylesheets/StaffMember.css'

const api = 'http://localhost:4000/'

class StaffMember extends Component {
  state = {
    staffName: '',
    daysArray: [],
  }

  componentDidMount = () => {
    const { weekDate, staffMember, staffID, users } = this.props
    this.setStaffName(staffID, users)
    this.setDaysArray(weekDate, staffMember)
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props !== prevProps) {
      const { weekDate, staffMember, staffID, users } = this.props
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
                                      shiftCategory: 'e',
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

  addShift = (shift) => {
    let days = [...this.state.daysArray]
    console.log(days, 'DAAAAAAAAAYS')
    console.log(shift)
    for (let i = 0; i < days.length; i++) {
      if (new Date(days[i].shifts[0].date).getDay() === new Date(shift[0].date).getDay()) {
        if (days[i].shifts.length < 3) {
          days.push(shift[0])
          this.setState({days})
          axios.post(api + 'rosters/shift/' + shift[0].shiftID, {shiftObj: shift[0], pushShift: true}).then((response) => {
            console.log(response)
          })
        } else {
          // GIVE ERROR TO USER
        }
        console.log(days[i].shifts.length, 'asdasd')
        break
      }
    }
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
                <div id='shift-cell'>
                  <Day shifts={ day.shifts }
                      staffID={ staffID }
                      weekID={ weekID }
                      fetchData={this.props.fetchData}
                      addShift={this.addShift}
                  />
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
