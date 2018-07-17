import React, { Component } from 'react'
import Pin from './keypad/Pin'
import ClockOnOff from './clockIn/ClockOnOff'

class Clocking extends Component {
state = {
  staffID: 1
}

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <ClockOnOff week={this.props.week} user={this.props.user} />

      </div>
    )
  }
}

export default Clocking
