import React, { Component } from 'react'
import axios from 'axios'
import Shift from './Shift'
import _ from 'underscore'
import '../../../stylesheets/Day.css'

class Day extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addShift: '',
      removeShiftVal: '',
      shifts: ''
    }
  }

  componentDidMount = () => {
    let sortedShifts = _.sortBy( this.props.shifts, 'start' );
    this.setState({
      shifts: sortedShifts
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.shifts !== this.props.shifts) {
      let sortedShifts = _.sortBy( this.props.shifts, 'start' );
      this.setState({
        shifts: sortedShifts
      })
    }
    if (prevProps.addShift !== this.props.addShift) {
      this.setState({
        addShift: this.props.addShift
      })
    }
    if (prevProps.removeShiftVal !== this.props.removeShiftVal) {
      this.setState({
        removeShiftVal: this.props.removeShiftVal
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
    let shifts = ''
    if (this.state.shifts) { shifts = this.state.shifts }
    else { shifts = this.props.shifts }
    const { staffID, weekID } = this.props
    return (
      <div className='shift-container'>
      {
        this.props.shifts.map((shift) => {
          return (
            <React.Fragment>
              <Shift  weekID={ weekID }
              staffID={ staffID }
              date={ shift.date }
              weekDate={ this.props.weekDate }
              shiftCategory={ shift.shiftCategory }
              start={ shift.start }
              finish={ shift.finish }
              shiftID={shift.shiftID}
              fetchData={this.props.fetchData}
              currentWeek={this.props.currentWeek}
              addShift={this.state.addShift}
              stopAdd={this.props.stopAdd}
              currentShiftDate={this.props.currentShiftDate}
              removeShiftVal={this.props.removeShiftVal}
              removeShift={this.props.removeShift}
              checkShiftTimes={this.props.checkShiftTimes}
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
