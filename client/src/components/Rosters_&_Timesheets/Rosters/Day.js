import React, { Component } from 'react'
import axios from 'axios'
import Shift from './Shift'
import '../../../stylesheets/Day.css'

class Day extends Component {

  componentDidMount = () => {
  }

  componentDidUpdate = (prevProps, prevState) => {
  }


  render() {
    const { shifts, staffID, weekID } = this.props

    return (
      <div>
      {
        shifts.map((shift) => {
          return (
            <Shift  weekID={ weekID }
            staffID={ staffID }
            date={ shift.date }
            shiftCategory={ shift.shiftCategory }
            start={ shift.start }
            finish={ shift.finish }
            fetchData={this.props.fetchData}
            addShift={this.props.addShift}
            />
          )
        })
      }
      </div>
    )

  }

}

export default Day
