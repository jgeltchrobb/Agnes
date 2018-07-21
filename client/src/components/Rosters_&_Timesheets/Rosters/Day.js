import React, { Component } from 'react'
import axios from 'axios'
import Shift from './Shift'
import '../../../stylesheets/Day.css'

class Day extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addShift: '',
    }
  }

  componentDidMount = () => {
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.addShift !== this.props.addShift) {
      this.setState({
        addShift: this.props.addShift
      })
    }
  }

  // addShift = (shift) => {
  //   // console.log(this.props.addShift(), 'ADDSHIFT')
  //   this.setState({
  //     addShift: this.props.addShift(shift)
  //   })
  // }

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
              currentWeek={this.props.currentWeek}
              addShift={this.state.addShift}
              stopAdd={this.props.stopAdd}
              currentShiftDate={this.props.currentShiftDate}
              />
              {/* <button id='add-shift-btn' onClick={() => this.addShift(shift)} >Add Shift</button> */}
            </React.Fragment>
          )
        })
      }
      </div>
    )

  }

}

export default Day
