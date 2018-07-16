import React, { Component } from 'react'
import Pin from './keypad/Pin'
import ClockOnOff from './clockIn/ClockOnOff'

class Clocking extends Component {
state = {
  staffID: 1
}

componentDidMount() {
}

// Render determines the type of user which has logged in
  render() {
    return (
      <div>
        <Pin /> <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <ClockOnOff />

      </div>
    )
  }
}

export default Clocking
