import React, { Component } from 'react'

class DateBar extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { weekDate } = this.props

    return (
      <div>

        {weekDate}

      </div>
    )
  }
}

export default DateBar
