import React, { Component } from 'react'

class Shift extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    // set state with object with date:, staffID:, shiftCategory:, start:, and finish:

  }

  formatTime = (time) => {

    if (time) {

      let hr = new Date(time).getHours()
        if (hr < 10) {
          hr = ('0' + hr)
        }
      let min = new Date(time).getMinutes()
        if (min < 10) {
          min = ('0' + min)
        }

      return ( `${hr} : ${min}` )

    } else { return '' }


  }


  render() {
    const { weekDate, staffID, date, shiftCategory, start, finish } = this.props

    return (

      <div>

        <div>{shiftCategory}</div>
        <div>{this.formatTime(start)}</div>
        <div>{this.formatTime(finish)}</div>


      </div>
    )
  }
}

export default Shift
