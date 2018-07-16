import React, { Component } from 'react'

class Clock extends Component {
  // Null is used to determine the time.
  state = {
    clockedOn: null,
    clockedOff: null,
  }

  constructor(props) {
    super(props)
  }

// The functions to determine the time when the buttons are clicked
  clockingOn = () => {
    this.setState({ clockedOn: new Date().toLocaleString() })
  }

  clockingOff = () => {
    this.setState({ clockedOff: new Date().toLocaleString() })
  }

  render() {
    return(
      <div>
        <button onClick={this.clockingOn}>Clock on</button>
        { this.state.clockedOn ? <p>You clocked on at: { this.state.clockedOn } </p> : '' }
        <br />

        <button onClick={this.clockingOff}>Clock off</button>
        { this.state.clockedOff ? <p>You clocked off at: { this.state.clockedOff } </p> : '' }
      </div>
    )
  }
}


export default Clock
