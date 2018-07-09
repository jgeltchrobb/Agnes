import React, { Component } from 'react'

class DateBar extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { weekDate } = this.props

    const barDate = `${weekDate.getDate()} / ${weekDate.getMonth()} / ${weekDate.getFullYear()}`

    return (
      <div>

        <p>{barDate}</p>

      </div>
    )
  }
}

export default DateBar
