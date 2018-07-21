import React, { Component } from 'react'
import '../../../../stylesheets/Flag.css'

class Flag extends Component {

  state = {
    staffName: '',
    date: '',
    rostered: '',
    difference: '',
    actual: '',
  }

  componentDidMount = () => {
    const { staffID, users, date, rostered, actual } = this.props
    this.setNameState(staffID, users)
    this.setDateState(date)
    this.setRosteredState(rostered)
    this.setActualState(actual)
    this.setDifferenceState(rostered, actual)
  }

  setNameState = (staffID, users) => {
    var staffName = ''
    users.map((user) => {
      if (user._id.toString() === staffID) {
        staffName = user.name
      }
    })
    this.setState({ staffName: staffName })
  }

  setDateState = (date) => {
    const shortDate = new Date(date).toLocaleDateString()
    const split = shortDate.split('/')
    split.pop()
    const dayMonth = split.join('/')
    this.setState({ date: dayMonth })
  }

  setRosteredState = (rostered) => {
    this.setState({
      rostered: this.formatTime_DateObjtoDisplayTime(new Date(rostered))
    })
  }

  setActualState = (actual) => {
    this.setState({
      actual: this.formatTime_DateObjtoDisplayTime(new Date(actual))
    })
  }

  convertMillisecondsToHrsMins = (milliseconds) => {
    var minutes = parseInt((milliseconds / (1000 * 60)) % 60)
    var hours = parseInt((milliseconds / (1000 * 60 * 60)) % 24)
    if (Number(hours) === 0) {
      return `${minutes}mins`
    } else {
      if (Number(minutes) === 0) {
        return `${hours}hrs`
      } else {
        return `${hours}hrs ${minutes}mins`
      }
    }
  }

  setDifferenceState = (rostered, actual) => {
    const milliToMinutes = 0.000016666666666667
    const diffMilli = new Date(rostered) - new Date(actual)

    this.setState({
      difference: this.convertMillisecondsToHrsMins( Math.abs(diffMilli) )
    })

  }

  formatTime_DateObjtoDisplayTime = (time) => {
    if (time) {
      let hr = new Date(time).getHours()
        if (hr < 10) {
          hr = ('0' + hr)
        }
      let min = new Date(time).getMinutes()
        if (min < 10) {
          min = ('0' + min)
        }
      return ( `${hr} : ${min}` )
    } else { return '' }
  }


  render() {
    const { staffName, date, rostered, difference, actual } = this.state

    return (
      <div className="flag-container">

        <div className="flag-top">
          <div className="flag-name"> { staffName } </div>
          <div className="flag-date"> { date } </div>
        </div>
        <div className="flag-bottom">
          <div className="flag-rostered"> { rostered } </div>
          <div className="flag-diff"> { difference } </div>
          <div className="flag-actual"> { actual } </div>
        </div>

      </div>
    )
  }

}

export default Flag
