import React, { Component } from 'react'

class Key extends Component {

  render() {
    return (
      <button className="key" onClick={() =>
        this.props.clickKey(this.props.value)
      }>
        { this.props.value }
      </button>
    );
  }
}

export default Key
