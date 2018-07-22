import React, { Component } from 'react'
import axios from 'axios'

class ClockButton extends Component {

  constructor(props) {
    super(props)
    this.state = {

      clockedIn: '',

      LastNightShiftID: '',
      LastNightShiftClockIn: '',
      LastNightShiftClockOut: '',

      shift1ID: '',
      shift1clockIn: '',
      shift1clockOut: '',

      shift2ID: '',
      shift2clockIn: '',
      shift2clockOut: '',

      TonightShiftID: '',
      TonightShiftClockIn: '',
      TonightShiftClockOut: '',
    }
  }

  componentDidMount = () => {
    const staffID = this.props.staffID
    // set clock status
    var clockedIn = false
    // today date needs to update daily with some kind of setTimeout function
    // const today = new Date()
    // for now we will use it to adjust what day we are looking at
    const today = new Date('2018-07-03')

    this.props.week.staff.map((staffMember) => {
    // Only for the staff member who is logged in
      if (staffMember.staffID === staffID) {

        var prevShiftDate = ''
        var prevPrevShiftDate = ''
        var shiftNumber = 1

        staffMember.shifts.map((shift) => {
          // shifts that finish today
          if (new Date(shift.finish.rostered).getDate() === today.getDate()) {
            // shift that finishes today but starts yesterday - Last Night's Shift
            if (new Date(shift.start.rostered).getDate() === today.getDate() - 1) {
              // toggle through previous clocks to set clock status
              if (shift.start.actual)   { clockedIn = true }
              if (shift.finish.actual)  { clockedIn = false }
              // save last nights shift to state
              this.setState({
                LastNightShiftID: shift._id,
                LastNightShiftClockIn: shift.start.actual,
                LastNightShiftClockOut: shift.finish.actual,
              })
            }
            // shifts that finish today and start today - shift 1 and 2
            if (new Date(shift.start.rostered).getDate() === today.getDate()) {
              // toggle through previous clocks to set clock status
              if (shift.start.actual)   { clockedIn = true }
              if (shift.finish.actual)  { clockedIn = false }
              // check if any previous shifts on same day
              if (shift.date === prevShiftDate) {
                shiftNumber = 2
              }
              // set previous shift date so next shift will see one has come before it on the same day
              prevShiftDate = shift.date
              // save todays shifts to state
              switch (shiftNumber) {
                case 1:
                this.setState({
                  shift1ID: shift._id,
                  shift1clockIn: shift.start.actual,
                  shift1clockOut: shift.finish.actual,
                })
                break
                case 2:
                this.setState({
                  shift2ID: shift._id,
                  shift2clockIn: shift.start.actual,
                  shift2clockOut: shift.finish.actual,
                })
                break
              }
            }
          }
          // shift that starts today but finish tomorrow - Tonights shift
          if (new Date(shift.start.rostered).getDate() === today.getDate() &&
              new Date(shift.finish.rostered).getDate() === today.getDate() + 1) {
            // toggle through previous clocks to set clock status
            if (shift.start.actual)   { clockedIn = true }
            if (shift.finish.actual)  { clockedIn = false }
            // save tonights shift to state
            this.setState({
              TonightShiftID: shift._id,
              TonightShiftClockIn: shift.start.actual,
              TonightShiftClockOut: shift.finish.actual,
            })
          }
        })
      }
    })
    // set last standing clock status
    this.setState({ clockedIn: clockedIn })
  }

  postTime = (startOrFinish, shiftID, time) => {
    const { api, week, staffID } = this.props

    // let timeObj =   {
    //                   weekID: week._id,
    //                   staffID: staffID,
    //                   shiftID: shiftID,
    //                   startOrFinish: startOrFinish,
    //                   time: time,
    //                 }
    //
    // axios.post(api + '/clock/new', {timeObj}).then((response) => {
    //   console.log(response)
    // })
  }

  clockIn = () => {
    const { TonightShiftID, TonightShiftClockIn, shift1ID, shift1clockIn, shift2ID, shift2clockIn } = this.state
    // Mark clock time as now
    var clockTime = new Date()
    // if no clock time for this shift and the shift exists
    if (!shift1clockIn) {
      if (shift1ID) {
        this.setState({ shift1clockIn: clockTime })
        this.postTime('start', shift1ID, shift1clockIn)
      }
    // else, if no clock time for this shift and the shift exists
    } else if (!shift2clockIn) {
      if (shift2ID) {
        this.setState({ shift2clockIn: clockTime })
        this.postTime('start', shift2ID, shift2clockIn)
      }
    // else, if no clock time for this shift and the shift exists
    } else if (!TonightShiftClockIn) {
      if (TonightShiftID) {
        this.setState({ TonightShiftClockIn: clockTime })
        this.postTime('start', TonightShiftID, TonightShiftClockIn)
      }
    }
    // change clock status
    this.setState({ clockedIn: true })
  }

  clockOut = () => {
    const { LastNightShiftID, LastNightShiftClockOut, shift1ID, shift1clockOut, shift2ID, shift2clockOut } = this.state
    // Mark clock time as now
    var clockTime = new Date()
    // if no clock time for this shift and the shift exists
    if (!LastNightShiftClockOut) {
      if (LastNightShiftID) {
        this.setState({ LastNightShiftClockOut: clockTime })
        this.postTime('finish', LastNightShiftID, LastNightShiftClockOut)
      }
    // else, if no clock time for this shift and the shift exists
    } else if (!shift1clockOut) {
      if (shift1ID) {
        this.setState({ shift1clockOut: clockTime })
        this.postTime('finish', shift1ID, shift1clockOut)
      }
    // else, if no clock time for this shift and the shift exists
    } else if (!shift2clockOut) {
      if (shift2ID) {
        this.setState({ shift2clockOut: clockTime })
        this.postTime('finish', shift2ID, shift2clockOut)
      }
    }
    // change clock status
    this.setState({ clockedIn: false })
  }


  render() {
    const { clockedIn, LastNightShiftClockOut, shift1clockIn, shift1clockOut, shift2clockIn, shift2clockOut, TonightShiftClockIn } = this.state

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
