import React, { Component } from 'react'

class Shift extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { catagory, staffID, start, finish, day } = this.props

    return (

      <div>

        <div>{day}</div>
        <div>{catagory}</div>
        <div>{start}</div>
        <div>{finish}</div>


      </div>
    )
  }
}

export default Shift
