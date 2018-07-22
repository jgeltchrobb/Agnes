import React, { Component } from 'react'
import ClockButton from './ClockButton'
import KeyPad from './office-clock/KeyPad'

class Clock extends Component {
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
    this.setClock()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.staffID !== prevProps.staffID) {
      this.setClock()
    }
  }

  setClock = () => {
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

  clock = (shift, clockTime, startOrFinish, shiftID) => {
    this.setState({ shift: clockTime })
    this.postTime(startOrFinish, shiftID, clockTime)
  }


  render() {
    const { staffID } = this.props
    const { clockedIn } = this.state
    const { LastNightShiftID, LastNightShiftClockIn, LastNightShiftClockOut } = this.state
    const { shift1ID, shift1clockIn, shift1clockOut } = this.state
    const { shift2ID, shift2clockIn, shift2clockOut } = this.state
    const { TonightShiftID, TonightShiftClockIn, TonightShiftClockOut } = this.state


    // if (this.props.role === 'staff') {
    //
    //   return (
    //     <div className='mobile-clock'>
    //
    //       <ClockButton  week={ week }
    //                     staffID={ staffID }
    //                     api={ api }
    //       />
    //
    //     </div>
    //   )
    // }

    // if (this.props.role === 'office clock') {

      return (
        <div className='office-clock'>

          <div>
            Enter Pin and then press Clock In/Out
          </div>

          <div>
            <KeyPad />
          </div>

          <ClockButton  staffID={ staffID }
                        LastNightShiftID={ LastNightShiftID }
                        LastNightShiftClockIn={ LastNightShiftClockIn }
                        LastNightShiftClockOut={ LastNightShiftClockOut }
                        shift1ID={ shift1ID }
                        shift1clockIn={ shift1clockIn }
                        shift1clockOut={ shift1clockOut }
                        shift2ID={ shift2ID }
                        shift2clockIn={ shift2clockIn }
                        shift2clockOut={ shift2clockOut }
                        TonightShiftID={ TonightShiftID }
                        TonightShiftClockIn={ TonightShiftClockIn }
                        TonightShiftClockOut={ TonightShiftClockOut }
                        clock={ this.clock }

          />

        </div>
      )
    // }

  }
}

export default Clock
