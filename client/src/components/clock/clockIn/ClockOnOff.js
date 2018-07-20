import React, { Component } from 'react'
import axios from 'axios'

// Pulls the week data from seed.js through App.js and Clock.js

class Clock extends Component {
  // Null is used to determine the time.
  state = {
    user: '',
    rosteredStart: null,
    rosteredFinish: null,
    actualStart: null,
    actualFinish: null,
    shiftIndex: 0,
    staffIndex: 0
  }

  constructor(props) {
    super(props)
  }

// Handles when users click the clock on button
  clockingOn = () => {
    const staffID = this.props.user.staffID
    console.log(staffID)
    this.setState({ user: staffID })


    // Have to get the correct shift for this staff member:
    let staff={}
    const updatedWeek = [...this.props.week]

    console.log(this.props.week)

    // Find the staff member
    for (let i = 0; i<this.props.week.staff.length; i++) {
     if(this.props.week.staff[i].staffID == staffID) {
       staff=this.props.week.staff[i]
       this.setState({ staffIndex: i })
       break
     }
    }

    // Now get the shift for today
    const today=new Date() // <-- pull off the date part - ignore time
    const shift={}



    // Find the shift for today of staff memeber
    for(let i=0; i<staff.shifts.length; i++) {
    //  // pull the date part of staff.shifts[i].date to compare to today's date
    //  // This assumes that the user is clocking only once on a day, and is clocking in
    //  // on that same day (so doesn't handle case that 2 shifts in one day or shift starts at 00:15 and clocking in at 11:59 the night before)
    // console.log(`compare ${new Date(staff.shifts[i].date).toDateString()} to ${today}`)
     if(true /*DEBUG*/ || new Date(staff.shifts[i].date).toDateString() == today.toDateString()) {
       staff.shifts[i].start.actual=today.toLocaleString()
       this.setState({
         shiftIndex: i,
         actualStart: today.toLocaleString(),
         rosteredStart: staff.shifts[i].start.rostered
       })
       break
     }
    }
    console.log(this.state)

    const actualTime = {
      weekID: this.props.week._id,
      staffID:this.props.user.staffID,
      date: this.state.rosteredStart,
      shiftNumber: this.state.shiftIndex,
      startOrFinish: 'start',
      time: today,
    }

  //  api.put(`/shift/${this.state.shiftIndex}`, staff.shifts[this.state.shiftIndex])

    // The rostered and actual clock on time
    // const shiftsStartRoster = this.props.week.staff[0].shifts[0].start.rostered
    // const shiftsStartActual = this.props.week.staff[0].shifts[0].start.actual
    // t
    // this.setState({ rosteredStart: new Date(shiftsStartRoster).toLocaleString() })
    // this.setState({ actualStart: new Date().toLocaleString() })
  }



// Handles when users click the clock off button
  clockingOff = () => {

    const shiftFinishRoster = this.props.week.staff[this.state.staffIndex].shifts[this.state.shiftIndex].finish.rostered
    this.props.week.staff[this.state.staffIndex].shifts[this.state.shiftIndex].finish.actual = new Date().toLocaleString()

    this.setState({ rosteredFinish: new Date(shiftFinishRoster).toLocaleString() })
    this.setState({ actualFinish: this.props.week.staff[this.state.staffIndex].shifts[this.state.shiftIndex].finish.actual })

    const actualTime = {
      weekID: this.props.week._id,
      staffID:this.props.user.staffID,
      date: this.state.rosteredFinish,
      shiftNumber: this.state.shiftIndex,
      startOrFinish: 'finish',
      time: new Date(),
    }
    // Push updates to the API
  }

  render() {
    // Buttons change once a user clicks 'Clock on'
    if (this.state.actualStart === null) {
      return(
        <div>
          <button onClick={this.clockingOn}>Clock on</button>
        </div>
      )
    } else if (this.state.actualStart !== null && this.state.actualFinish === null) {
      // Display clock on time and clock off button
      return (
        <div>
          <button onClick={this.clockingOff}>Clock off</button>
          { this.state.actualStart ? <p> You ({ this.state.user }) clocked on at: { this.state.actualStart } and were rostered to start at: {this.state.rosteredStart} </p> : '' }
        </div>
      )
    } else {
      // Removes the button and displays the clock off time above the clock on time.
      return (
        <div>
          <br />
          { this.state.actualFinish ? <p> { this.state.user } clocked off at: { this.state.actualFinish } and were rostered to finish at: {this.state.rosteredFinish} </p> : '' }
          { this.state.actualStart ? <p> You ({ this.state.user }) clocked on at: { this.state.actualStart } and were rostered to start at: {this.state.rosteredStart} </p> : '' }
        </div>
      )
    }
  }
}

export default Clock
