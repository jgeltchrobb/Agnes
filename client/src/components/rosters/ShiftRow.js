import React, { Component } from 'react'
import Shift from './Shift'

class ShiftRow extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { staffID, shifts } = this.props.staffMember

    return (
      <div>

        <h3>
        {/* Here we want to display the name so need to query user data which
          should be stored in App state and passed down to this component */}
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

      </div>
    )

  }
}

export default ShiftRow
