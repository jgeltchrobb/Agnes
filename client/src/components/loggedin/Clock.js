import React, { Component } from 'react'
import Header from './Header'

class Clock extends Component {
  state = {
    clockedOn: null,
    clockedOff: null
  }

  constructor(props) {
    super(props)
  }

  clockingOn = () => {
    this.setState({ clockedOn: new Date().toLocaleString() })
  }

  clockingOff = () => {
    this.setState({ clockedOff: new Date().toLocaleString() })
  }

  render() {
    return(
      <div>
        <Header />
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
