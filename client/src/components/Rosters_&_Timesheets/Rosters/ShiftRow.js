import React, { Component } from 'react'
import Shift from './Shift'

class ShiftRow extends Component {
  state = {
    shiftsArray: null,
  }

  componentDidMount = () => {
    this.compileShiftsArray()

  }
  componentWillUnmount() {
  }

  // shouldComponentUpdate(nextProps) {
  //
  //   if (nextProps.weekDate === this.props.weekDate) return false
  //   return true
  // }

  // setWeekDates = () => {
  //   const { weekDate } = this.props
  //   const weekDates = []
  //   for (let add = 0; add < 7; add++) {
  //     let day = new Date(weekDate)
  //     day.setDate(day.getDate() + add)
  //     weekDates.push(day)
  //   }
  //   this.setState({
  //     weekDates: weekDates
  //   })
  // }

  compileShiftsArray = () => {
    const shiftsArray = []

    const { staffID, shifts } = this.props.staffMember

    const weekDate = new Date(this.props.weekDate)

    shifts.map((shift) => {

      for (let day = 0; day < 7; day++) {

        let date = new Date(weekDate)
        // for each shift, loop through the dates of the week checking if:
        // - Monday date is === to shift date,, if so push shift,, else push empty shift
        // - Tuesday same thing
        if ( (weekDate.getDate() + day) === new Date(Number(shift.date)).getDate() ) {
          shiftsArray.push(
                            {
                              staffID: staffID,
                              date: new Date(Number(shift.date)),
                              shiftCategory: shift.shiftCategory,
                              start: new Date(Number(shift.start.rostered)),
                              finish: new Date(Number(shift.finish.rostered)),
                            }
                          )
        }
        else {
          shiftsArray.push(
                            {
                              staffID: staffID,
                              date: new Date(date.setDate(weekDate.getDate() + day)),
                              shiftCategory: '',
                              start: '',
                              finish: '',
                            }
                          )

        }

      }
    })
    this.setState({
      shiftsArray: shiftsArray
    })
  }

  render() {
    const { weekDate } = this.props
    const { staffID, shifts } = this.props.staffMember

    if (!this.state.shiftsArray) { return '' }

    return (
      <div>

        <h3>
        {/* Here we want to display the name so need to query user data which
          should be stored in App state and passed down to this component */}
          {staffID}
        </h3>

        <div>
          {
            this.state.shiftsArray.map((shift) => {
              return (
                <Shift  date={shift.date}
                        staffID={staffID}
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
