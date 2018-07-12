import React, { Component } from 'react'

class Shift extends Component {
  constructor(props) {
    super(props)

  }

  formatTime = (time) => {

    let hr = time.getHours()
      if (hr < 10) {
       hr = ('0' + hr)
      }

    let min = time.getMinutes()
      if (min < 10) {
       min = ('0' + min)
      }

    return `${hr} : ${min}`
  }


  render() {
    const { catagory, staffID, start, finish } = this.props

    return (

      <div>

        <div>{catagory}</div>
        <div>{this.formatTime(start)}</div>
        <div>{this.formatTime(finish)}</div>


      </div>
    )
  }
}

export default Shift
