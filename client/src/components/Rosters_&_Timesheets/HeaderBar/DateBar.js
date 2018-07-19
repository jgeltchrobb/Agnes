import React, { Component } from 'react'

class DateBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weekDate: ''
    }
  }

  render() {
    let weekDate = new Date(this.props.weekDate).toLocaleDateString()

    return (
      <div>

        <p>{weekDate}</p>

      </div>
    )
  }
}

export default DateBar
