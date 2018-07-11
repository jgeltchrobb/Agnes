import React, { Component } from 'react'

class DateBar extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const weekDate = new Date(this.props.weekDate)
    // console.log(new Date(weekDate))

    const barDate = `${weekDate.getDate()} / ${weekDate.getMonth()} / ${weekDate.getFullYear()}`

    return (
      <div>

        <p>{barDate}</p>

      </div>
    )
  }
}

export default DateBar
