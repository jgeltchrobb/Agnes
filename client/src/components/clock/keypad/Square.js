import React, { Component } from 'react'
import Board from './Board'
import Pin from './Pin'
import data from './data'

// Sets up the buttons functions when clicked.

class Square extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <button className="square" onClick={() =>
        this.props.clickHandler(this.props.value)
      }>
        { this.props.value }
      </button>
    );
  }
}

export default Square
