import React, { Component } from 'react'
import Square from './Square'
import Board from './Board'
import data from './data'


class Pin extends Component {
  render() {
    return (
      <div className="Pin">
        <div className="Pin-board">
          <Board user={this.props.user} />
        </div>
      </div>
    );
  }
}

export default Pin
