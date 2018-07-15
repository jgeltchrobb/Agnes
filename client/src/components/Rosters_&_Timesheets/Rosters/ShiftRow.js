import React, { Component } from 'react'
import Shift from './Shift'
import '../../../stylesheets/ShiftRow.css'

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

    for (let day = 0; day < 7; day++) {
      let pushed = 'no'
      let date = new Date(weekDate)
      shifts.map((shift) => {
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
          pushed = 'yes'
        }
      })
      if (pushed === 'no') {
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
    this.setState({
      shiftsArray: shiftsArray,
      name: name,
    })
  }


  render() {
    const { weekDate  } = this.props
    const { staffID, shifts } = this.props.staffMember

    if (!this.state.shiftsArray && !this.state.name) { return '' }

    console.log(this.state.shiftsArray)

    return (
      <div className="shift-row">


        <div className="shifts">
          
          <div>
            <h3>{this.state.name}</h3>
          </div>
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
