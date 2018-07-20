import React, { Component } from 'react'
import axios from 'axios'
import Shift from './Shift'
import '../../../stylesheets/Day.css'

class Day extends Component {

  componentDidMount = () => {
  }

  componentDidUpdate = (prevProps, prevState) => {
  }

  addShift = () => {
    this.props.addShift(this.props.shifts)
  }

  render() {
    const { shifts, staffID, weekID } = this.props
    return (
      <div className='shift-container'>
      {
        shifts.map((shift) => {
          return (
            <React.Fragment>
              <Shift  weekID={ weekID }
              staffID={ staffID }
              date={ shift.date }
              shiftCategory={ shift.shiftCategory }
              start={ shift.start }
              finish={ shift.finish }
              shiftID={shift.shiftID}
              fetchData={this.props.fetchData}
              />
              <button onClick={this.addShift} >asdas</button>
            </React.Fragment>
          )
        })
      }
      </div>
    )

  }

}

export default Day
