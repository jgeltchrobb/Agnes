import React, { Component } from 'react'
import Square from './Square'
import Pin from './Pin'
import data from './data'

// Where the buttons are displayed.

class Board extends Component {
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

    console.log(pinDetails)
    // console.log(typeof this.props.user.PIN)

    // if (pinDetails.length > 4) {
    //   alert('Incorrect details please try again')
    //   // window.location.reload()
    // } else if (pinDetails.join('') == this.props.user.PIN) {
    //   console.log(this.props.user.name)
    // }

    // window.location.reload()
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
      return (
        <div>
          <p>foo</p>
        </div>
      )
    }
  }

  renderSquare(i) {
    return <Square value={i} clickHandler={this.displayNumber} />;
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
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
        </div>
        <div className="board-row">
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>
        <div className="board-row">
        {this.renderSquare(0)}
        </div>
        <div className="status">{this.displayPIN()}</div>
        <button onClick={this.submitPin}>Submit</button>
        <button onClick={this.removeNumber}>Remove Number</button>
      </div>
    );
  }
}

export default Board
