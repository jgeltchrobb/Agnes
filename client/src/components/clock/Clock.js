import React, { Component } from 'react'
import { api, setJwt } from '../../api/init'
import axios from 'axios'
import KeyPad from './KeyPad'
import '../../stylesheets/Clock.css'

class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {

      week: '',
      user: this.props.user,
      greeting: '',
      clocked: false,
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

  componentDidMount = async () => {
    await this.setWeek()
    this.checkUser()
  }

  setWeek = async () => {
    await api.get('clock').then(response => {
      this.setState({ week: response.data })
    })
    return true
  }

  checkUser = () => {
    const user = this.state.user
    if (user.role === 'staff') {
      this.setClock(user._id)
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    // if  (this.state.clockedIn !== prevState.clockedIn) {
      // this.setClock(this.state.user._id)
  }

  setClock = (userID) => {
    console.log(this.state.user)
    // set clock status
    var clockedIn = false
    // can set today as any date, to clock for that day if you wanted to
    const today = new Date()

    this.state.week.staff.map((staffMember) => {

      if (staffMember.staffID === userID) {
        var prevShiftDate = ''
        var prevPrevShiftDate = ''
        var shiftNumber = 1

        staffMember.shifts.map((shift) => {
          // shifts that finish today
          if (new Date(shift.finish.rostered).getDate() === today.getDate()) {
            // shifts that finish today but started yesterday - "LastNightShift"
            // below must be refactord to avoid breaking at end of month night shift where the minus 1 will yield zero instead of 31
            if (new Date(shift.start.rostered).getDate() === today.getDate() - 1) {
              // toggle through previous previous clocks to set clock status
              // rename all "actual" to "clock"
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
              // check if any previous shifts on same day - check if shift 1 or 2
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
          // shifts that start today but finish tomorrow - tonightShift
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
// could add logic to make it know which shift you are clocking in for - instead of just consequtive
  clockIn = () => {
    const { validatePIN, shift1ID, shift1clockIn, shift2ID, shift2clockIn, TonightShiftID, TonightShiftClockIn } = this.state
    // Mark clock time as now
    var clockTime = new Date()
    // if no clock time for this shift and the shift exists
    if (shift1ID && !shift1clockIn) {
      this.postTime('start', shift1ID, clockTime)
      // else, if no clock time for this shift and the shift exists
    } else if (shift2ID && !shift2clockIn) {
      this.postTime('start', shift2ID, clockTime)
      // else, if no clock time for this shift and the shift exists
    } else if (TonightShiftID && !TonightShiftClockIn) {
      this.postTime('start', TonightShiftID, clockTime)
    }
  }

  clockOut = () => {
    const { validatePIN, LastNightShiftID, LastNightShiftClockOut, shift1ID, shift1clockOut, shift2ID, shift2clockOut } = this.state
    // Mark clock time as now
    var clockTime = new Date()
    // if no clock time for this shift and the shift exists
    if (LastNightShiftID && !LastNightShiftClockOut) {
      this.postTime('finish', LastNightShiftID, clockTime)
    // else, if no clock time for this shift and the shift exists
    } else if (shift1ID && !shift1clockOut) {
      this.postTime('finish', shift1ID, clockTime)
    // else, if no clock time for this shift and the shift exists
    } else if (shift2ID && !shift2clockOut) {
      this.postTime('finish', shift2ID, clockTime)
    }
  }

  postTime = async (startOrFinish, shiftID, time) => {

    let io = ''
    startOrFinish === 'start' ? io = 'in' : io = 'out'

    let timeObj =   {
                      weekID: this.state.week._id,
                      staffID: this.state.user._id,
                      shiftID: shiftID,
                      startOrFinish: startOrFinish,
                      time: time,
                    }

    await api.post('clock/new', timeObj).then(response => {
    })
    this.setState({ greeting: `${this.state.user.name} clocked ${io} at ${time}` })
    this.props.fetchWeeks(this.state.week.date)
  }

  officeClock = async (user) => {
    this.setState({ user: user })
    await this.setClock(user._id)
    this.state.clockedIn ? this.clockOut() : this.clockIn()
  }

  mobileClock = () => {
    this.state.clockedIn ? this.clockOut() : this.clockIn()
  }


  render() {
    const role = this.state.user.role
    // const { clockedIn } = this.state
    // const { LastNightShiftID, LastNightShiftClockIn, LastNightShiftClockOut } = this.state
    // const { shift1ID, shift1clockIn, shift1clockOut } = this.state
    // const { shift2ID, shift2clockIn, shift2clockOut } = this.state
    // const { TonightShiftID, TonightShiftClockIn, TonightShiftClockOut } = this.state
    // console.log('last night OUT..', LastNightShiftClockOut)
    // console.log('1 IN..', shift1clockIn)
    // console.log('1 OUT..', shift1clockOut)
    // console.log('2 IN..', shift2clockIn)
    // console.log('2 OUT..', shift2clockOut)
    // console.log('tonight IN..', TonightShiftClockIn)

    if (role === 'staff') {

      return (
        <div className='mobile-clock'>

          <div>
            { this.state.greeting }
          </div>

          <button onClick={ this.mobileClock }> clock </button>

        </div>
      )

    }

    if (role === 'admin') {

      return (
        <div className='office-clock'>

          <div>
            { this.state.greeting }
          </div>

          <div className="office-clock-container">
            <KeyPad users={ this.props.users }
                    officeClock={ this.officeClock }

            />
          </div>

        </div>
      )
    }



  }
}

export default Clock
