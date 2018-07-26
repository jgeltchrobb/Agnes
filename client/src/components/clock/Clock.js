import React, { Component } from 'react'
import axios from 'axios'
import KeyPad from './KeyPad'
import '../../stylesheets/Clock.css'

class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {

      week: '',
      user: '',
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
    // console.log('cDID MOUNT!!!')
    const { week, user } = this.props
    await this.setState({ week: week })
    if (user) {
      this.setState({ user: user})
      this.setClock()
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { week, user } = this.props
    if (week !== prevProps.week) {
      await this.setState({ week: week })
      this.setClock()
    }
    if  (this.state.clockedIn !== prevState.clockedIn) {
      this.setClock()
    }
  }

  setClock = () => {
    // set clock status
    var clockedIn = false
    // today date needs to update daily with some kind of setTimeout function
    // const today = new Date()
    // for now we will use it to adjust what day we are looking at
    const today = new Date()

    this.state.week.staff.map((staffMember) => {
    // Only for the staff member who is logged in
      if (staffMember.staffID === this.state.user._id) {
        var prevShiftDate = ''
        var prevPrevShiftDate = ''
        var shiftNumber = 1

        staffMember.shifts.map((shift) => {
          // shifts that finish today
          if (new Date(shift.finish.rostered).getDate() === today.getDate()) {
            // shift that finishes today but starts yesterday - Last Night's Shift
            if (new Date(shift.start.rostered).getDate() === today.getDate() - 1) {
              // console.log('last nights shift', shift)
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
    let inOrOut = ''
    if (startOrFinish === 'start') { inOrOut = 'in' }
    if (startOrFinish === 'finish') { inOrOut = 'out' }
    this.setState({ greeting: `${this.state.user.name} clocked ${inOrOut} at ${time}` })
    const { api, week, } = this.props

    let timeObj =   {
                      weekID: week._id,
                      staffID: this.state.user._id,
                      shiftID: shiftID,
                      startOrFinish: startOrFinish,
                      time: time,
                    }

    await axios.post(api + 'clock/new', timeObj).then((response) => {
    })
    this.props.fetchWeeks(this.state.week.date)
  }

  setGreeting = (inOrOut, clockTime) => {
    this.setState({ greeting: `${this.state.user.name} clocked ${inOrOut} at ${clockTime}` })
  }

  officeClock = async (user) => {
    this.setState({ user: user })
    await this.setClock()
    this.state.clockedIn ? this.clockOut() : this.clockIn()
  }

  mobileClock = () => {
    this.state.clockedIn ? this.clockOut() : this.clockIn()
  }

  render() {
    const role = 'office-clock'
    // const role = 'mobile-clock'
    const { clockedIn } = this.state
    const { LastNightShiftID, LastNightShiftClockIn, LastNightShiftClockOut } = this.state
    const { shift1ID, shift1clockIn, shift1clockOut } = this.state
    const { shift2ID, shift2clockIn, shift2clockOut } = this.state
    const { TonightShiftID, TonightShiftClockIn, TonightShiftClockOut } = this.state

    // console.log('last night OUT..', LastNightShiftClockOut)
    // console.log('1 IN..', shift1clockIn)
    // console.log('1 OUT..', shift1clockOut)
    // console.log('2 IN..', shift2clockIn)
    // console.log('2 OUT..', shift2clockOut)
    // console.log('tonight IN..', TonightShiftClockIn)

    if (role === 'mobile-clock') {

      return (
        <div className='mobile-clock'>

          <div>
            { this.state.greeting }
          </div>

          <button onClick={ this.mobileClock }> clock </button>

        </div>
      )

    }

    if (role === 'office-clock') {

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
