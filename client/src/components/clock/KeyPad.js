import React, { Component } from 'react'
import Key from './Key'
import '../../stylesheets/KeyPad.css'


// Where the buttons are displayed.

class KeyPad extends Component {
  // Details are an empty array which add numbers when a button is clicked.
  constructor(props){
    super(props)
    this.state = {
      pinInput: [],
    }
  }

  validatePIN = () => {
    const { users, officeClock } = this.props
    const pinInput = [...this.state.pinInput]
    users.map((user) => {
      if (user.PIN.toString() === pinInput.join('')) {
        if (user) {
          officeClock(user)
          return true
        } else {
          alert('Incorrect PIN please try again')
          return false
        }
      }
    })
    this.clearPinInput()
  }

  clickKey = (i) => {
    const pinInput = [...this.state.pinInput]
    if (pinInput.length < 4) {
      pinInput.push(i)
      this.setState({ pinInput })
    } else {
      alert('PIN must be 4 numbers')
      this.clearPinInput()
    }

  }

  renderKey(i) {
    return <Key value={i} clickKey={ this.clickKey } />
  }

  displayPIN = () => {
    let pin = ''
    for (let num of this.state.pinInput) {
      pin += num
    }
    return pin
  }

  clearPinInput = () => {
    this.setState({ pinInput: [] })
  }

  render() {

    return (
      <div className="keypad-container">
        <input value={this.displayPIN()} placeholder='Enter pin' className="keypad-input" />

        <div className="keypad-row">
          {this.renderKey(1)}
          {this.renderKey(2)}
          {this.renderKey(3)}
        </div>

        <div className="keypad-row">
          {this.renderKey(4)}
          {this.renderKey(5)}
          {this.renderKey(6)}
        </div>

        <div className="keypad-row">
          {this.renderKey(7)}
          {this.renderKey(8)}
          {this.renderKey(9)}
        </div>

        <div className="keypad-row last-row">
          <button className="placeholder"></button>
          {this.renderKey(0)}
          <button className="placeholder"></button>
        </div>

        <div className="keypad-action">
          <button onClick={ this.clearPinInput }>Clear</button>
          <button onClick={ this.validatePIN }> Clock </button>
        </div>
      </div>
    );
  }
}

export default KeyPad
