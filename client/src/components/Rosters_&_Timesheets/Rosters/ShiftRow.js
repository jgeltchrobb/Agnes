import React, { Component } from 'react'
import Shift from './Shift'

class ShiftRow extends Component {
  state = {
    name: '',
    shiftsArray: '',
  }

  componentDidMount = () => {
    const { staffID, shifts } = this.props.staffMember

    var name = ''
    this.props.users.map((user) => {
      if (user.staffID.toString() === staffID) {
        name = user.name
      }
    })

    const weekDate = new Date(this.props.weekDate)
    const shiftsArray = []

    // await this.setName()
    // console.log(this.state.Name)

    shifts.map((shift) => {

      // console.log(weekDate.getDate() + 1)
      // console.log(new Date(shift.date).getDate())

      for (let day = 0; day < 7; day++) {

        let date = new Date(weekDate)
        // for each shift, loop through the dates of the week checking if:
        // - Monday date is === to shift date,, if so push shift,, else push empty shift
        // - Tuesday same thing
        if ( (weekDate.getDate() + day) === new Date(shift.date).getDate() ) {
          shiftsArray.push(
                            {
                              staffID: staffID,
                              date: new Date(shift.date),
                              shiftCategory: shift.shiftCategory,
                              start: new Date(shift.start.rostered),
                              finish: new Date(shift.finish.rostered),
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
      shiftsArray: shiftsArray,
      name: name,
    })
    // console.log(shiftsArray)
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


  render() {
    const { weekDate  } = this.props
    const { staffID, shifts } = this.props.staffMember

    if (!this.state.shiftsArray && !this.state.name) { return '' }

    return (
      <div>

        <h3>
          {this.state.name}
        </h3>

        <div>
          {
            this.state.shiftsArray.map((shift) => {
              return (
                <Shift  date={shift.date}
                        staffID={shift.staffID}
                        name={shift.name}
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
