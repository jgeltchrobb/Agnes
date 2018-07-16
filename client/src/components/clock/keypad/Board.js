import React, { Component } from 'react'
import Square from './Square'
import Pin from './Pin'
import data from './data'

// Where the buttons are displayed.

class Board extends Component {
  // Details are an empty array which add numbers when a button is clicked.
  constructor(){
    super()
    this.state = {
      pinDetails: []
    }
  }

  displayNumber = (i) => {
    // Displays the numbers when their buttons are clicked
    const pinDetails = [...this.state.pinDetails]
    pinDetails.push(i)
    this.setState({
      pinDetails
    })
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

      </div>
    );

  }
}

export default Board
