import React, { Component } from 'react'
import Shift from './Shift'

class ShiftRow extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount = () => {
    // pull this out into a function and call it in cDM AND cDU
    // then it will run and make a new shiftsArray from scratch with any roster inputs or other props or state updates
    const { staffID, shifts } = this.props.staffMember
    const weekDate = new Date(this.props.weekDate)

    const shiftsArray = []
    shifts.map((shift) => {
      // check foir shift with week start date: do.. then with week start date + 1: do.. etc

        console.log( shift.start.rostered )




      if (new Date(weekDate.setDate((weekDate.getDate() + 0))) === shift.date) { shiftsArray.push({staffID: staffID, date: new Date(shift.date), start: new Date(shift.start.rostered), finish: new Date(shift.start.rostered)})}
      else { shiftsArray.push({staffID: staffID, date: '', start: '', finish: ''}) }

      if (new Date(weekDate.setDate((weekDate.getDate() + 1))) === shift.date) { shiftsArray.push({staffID: staffID, date: new Date(shift.date), start: new Date(shift.start.rostered), finish: new Date(shift.start.rostered)})}
      else { shiftsArray.push({staffID: staffID, date: '', start: '', finish: ''}) }

      if (new Date(weekDate.setDate((weekDate.getDate() + 2))) === shift.date) { shiftsArray.push({staffID: staffID, date: new Date(shift.date), start: new Date(shift.start.rostered), finish: new Date(shift.start.rostered)})}
      else { shiftsArray.push({staffID: staffID, date: '', start: '', finish: ''}) }

      if (new Date(weekDate.setDate((weekDate.getDate() + 3))) === shift.date) { shiftsArray.push({staffID: staffID, date: new Date(shift.date), start: new Date(shift.start.rostered), finish: new Date(shift.start.rostered)})}
      else { shiftsArray.push({staffID: staffID, date: '', start: '', finish: ''}) }

      if (new Date(weekDate.setDate((weekDate.getDate() + 4))) === shift.date) { shiftsArray.push({staffID: staffID, date: new Date(shift.date), start: new Date(shift.start.rostered), finish: new Date(shift.start.rostered)})}
      else { shiftsArray.push({staffID: staffID, date: '', start: '', finish: ''}) }

      if (new Date(weekDate.setDate((weekDate.getDate() + 5))) === shift.date) { shiftsArray.push({staffID: staffID, date: new Date(shift.date), start: new Date(shift.start.rostered), finish: new Date(shift.start.rostered)})}
      else { shiftsArray.push({staffID: staffID, date: '', start: '', finish: ''}) }

      if (new Date(weekDate.setDate((weekDate.getDate() + 6))) === shift.date) { shiftsArray.push({staffID: staffID, date: new Date(shift.date), start: new Date(shift.start.rostered), finish: new Date(shift.start.rostered)})}
      else { shiftsArray.push({staffID: staffID, date: '', start: '', finish: ''}) }


      // let shiftObj = {staffID: staffID}
      // if (shift )
      // shiftObj.date = new Date(shift.date)
      // shiftObj.start = new Date(shift.start.rostered)
      // shiftObj.finish = new Date(shift.finish.rostered)
      // shiftsArray.push(shiftObj)
    })
    console.log(shiftsArray)
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
                  catagory={shift.shiftCategory}
                  staffID={staffID}
                  start={new Date(shift.start.rostered)}
                  finish={new Date(shift.finish.rostered)}
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
