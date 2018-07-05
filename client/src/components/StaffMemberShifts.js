import React, { Component } from 'react'
import Shift from './Shift'

class StaffMemberShifts extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { staffID, shifts } = this.props.staffMember

    return (
      <div>

        <h3>
          {staffID}
        </h3>

        <div>
          {
            shifts.map((shift) => {
              return (
                <Shift
                  day={shift.day}
                  catagory={shift.shiftCategory}
                  staffID={staffID}
                  start={shift.start.rostered}
                  finish={shift.finish.rostered}
                />
              )
            })
          }
        </div>

        <div>
        </div>

      </div>
    )

  }
}

export default StaffMemberShifts
