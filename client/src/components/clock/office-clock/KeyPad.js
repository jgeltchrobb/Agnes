import React, { Component } from 'react'
import Key from './Key'
import data from './data'

// Where the buttons are displayed.

class KeyPad extends Component {
  // Details are an empty array which add numbers when a button is clicked.
  constructor(props){
    super(props)
    this.state = {
      pinDetails: [],
    }
  }

  displayNumber = (i) => {
    // Displays the numbers when their buttons are clicked
    // & puts them into an array
    const pinDetails = [...this.state.pinDetails]
    if (pinDetails.length < 4) {
      pinDetails.push(i)
      this.setState({
        pinDetails
      })
    } else {
      alert('PIN can only have 4 numbers')
      this.setState({pinDetails: []})
    }


  }

  removeNumber = () => {
    let removeNumber = [...this.state.pinDetails]
    removeNumber.pop()
    this.setState({pinDetails: removeNumber})
    console.log(removeNumber)
  }

  submitPin = () => {
    const pinDetails = [...this.state.pinDetails]
    if (pinDetails.join('') != this.props.user.PIN) {
      alert('Incorrect details please try again')
      // Resets the pin numbers without refreshing the page
      this.setState({pinDetails: []})
      // Displays user's name
    } else if (pinDetails.join('') == this.props.user.PIN) {
      console.log(this.props.user.name)
    }
  }

  renderKey(i) {
    return <Key value={i} clickHandler={this.displayNumber} />;
  }

  displayPIN = () => {
    let pin = ''
    for (let num of this.state.pinDetails) {
      pin += num
    }
    return `Pin number: ${pin}`;
  }

  render() {
    const status = 'Please enter you pin below:';

    return (
      <div>
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
        <div className="keypad-row">
        {this.renderKey(0)}
        </div>
        <div className="status">{this.displayPIN()}</div>
        <button onClick={this.submitPin}>Submit</button>
        <button onClick={this.removeNumber}>Remove Number</button>
      </div>
    );
  }
}

export default KeyPad
