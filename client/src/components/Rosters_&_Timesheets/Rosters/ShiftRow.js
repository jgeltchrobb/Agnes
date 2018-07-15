import React, { Component } from 'react'
import Shift from './Shift'
import '../../../stylesheets/ShiftRow.css'

class ShiftRow extends Component {
  state = {
    staffName: '',
    shiftsArray: '',
  }

  componentDidMount = () => {
    const { weekDate, staffMember, users } = this.props
    this.setStaffName(staffMember.staffID, users)
    this.setShiftsArray(weekDate, staffMember)
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props !== prevProps) {
      const { weekDate, staffMember, users } = this.props
      this.setStaffName(staffMember.staffID, users)
      this.setShiftsArray(weekDate, staffMember)
    }
  }

  setStaffName = (staffID, users) => {
    users.map((user) => {
      if (user.staffID.toString() === staffID) {
        this.setState({ staffName: user.name })
      }
    })
  }

  setShiftsArray = (dateString, staffMember) => {
    const weekDate = new Date(dateString)
    const shiftsArray = []

    for (let day = 0; day < 7; day++) {
      let pushed = 'no'
      staffMember.shifts.map((shift) => {
        if ( (weekDate.getDate() + day) === new Date(shift.date).getDate() ) {
          shiftsArray.push(
                            {
                              staffID: staffMember.staffID,
                              date: new Date(shift.date),
                              shiftCategory: shift.shiftCategory,
                              start: new Date(shift.start.rostered),
                              finish: new Date(shift.finish.rostered),
                            }
                          )
          pushed = 'yes'
        }
      })
      if (pushed === 'no') {
        let dateCopy = new Date(weekDate)
        shiftsArray.push(
          {
            staffID: staffMember.staffID,
            date: new Date(dateCopy.setDate(weekDate.getDate() + day)),
            shiftCategory: 'empty',
            start: '',
            finish: '',
          }
        )
      }
    }
    this.setState({ shiftsArray: shiftsArray })
  }


  render() {
    if (!this.state.shiftsArray && !this.state.staffName) { return '' }

    return (
      <div className="shift-row">

        <div className="shifts">

          <div>
            <h3>{this.state.staffName}</h3>
          </div>
          {
            this.state.shiftsArray.map((shift) => {
              return (
                <Shift  date={shift.date}
                        staffID={shift.staffID}
                        shiftCategory={shift.shiftCategory}
                        start={shift.start}
                        finish={shift.finish}
                />
              )
            })
          }
        </div>

      </div>
    )

  }
}

export default ShiftRow
