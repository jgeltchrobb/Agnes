import React, { Component } from 'react'
import axios from 'axios'

class ClockButton extends Component {

  clockIn = () => {
    const { shift1ID, shift1clockIn, shift2ID, shift2clockIn, TonightShiftID, TonightShiftClockIn, clock } = this.props
    // Mark clock time as now
    var clockTime = new Date()
    // if no clock time for this shift and the shift exists
    if (!shift1clockIn) {
      if (shift1ID) {
        this.clock(shift1clockIn, clockTime, 'start', shift1ID)
      }
    // else, if no clock time for this shift and the shift exists
    } else if (!shift2clockIn) {
      if (shift2ID) {
        this.clock(shift2clockIn, clockTime, 'start', shift2ID)
      }
    // else, if no clock time for this shift and the shift exists
    } else if (!TonightShiftClockIn) {
      if (TonightShiftID) {
        this.clock(TonightShiftClockIn, clockTime, 'start', TonightShiftID)

      }
    }
    // change clock status
    this.setState({ clockedIn: true })
  }

  clockOut = () => {
    const { LastNightShiftID, LastNightShiftClockOut, shift1ID, shift1clockOut, shift2ID, shift2clockOut, clock } = this.props
    // Mark clock time as now
    var clockTime = new Date()
    // if no clock time for this shift and the shift exists
    if (!LastNightShiftClockOut) {
      if (LastNightShiftID) {
        this.clock(LastNightShiftClockOut, clockTime, 'finish', LastNightShiftID)
      }
    // else, if no clock time for this shift and the shift exists
    } else if (!shift1clockOut) {
      if (shift1ID) {
        this.clock(shift1clockOut, clockTime, 'finish', shift1ID)
      }
    // else, if no clock time for this shift and the shift exists
    } else if (!shift2clockOut) {
      if (shift2ID) {
        this.clock(shift2clockOut, clockTime, 'finish', shift2ID)
      }
    }
    // change clock status
    this.setState({ clockedIn: false })
  }


  render() {
    const { clockedIn, LastNightShiftClockOut, shift1clockIn, shift1clockOut, shift2clockIn, shift2clockOut, TonightShiftClockIn } = this.props

    console.log('last night OUT..', LastNightShiftClockOut)
    console.log('1 IN..', shift1clockIn)
    console.log('1 OUT..', shift1clockOut)
    console.log('2 IN..', shift2clockIn)
    console.log('2 OUT..', shift2clockOut)
    console.log('tonight IN..', TonightShiftClockIn)


    if (clockedIn) {
      return (
        <div>
          <button onClick={this.clockOut}>Clock Out</button>
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={this.clockIn}>Clock In</button>
        </div>
      )
    }

  }
}

export default ClockButton
