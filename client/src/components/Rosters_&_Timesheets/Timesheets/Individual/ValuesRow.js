import React, { Component } from 'react'
import Value from './Value'
import '../../../../stylesheets/ValuesRow.css'

class ValuesRow extends Component {
  //   state = {
  //     loaded: false,
  //   }
  //
  // componentDidMount = async () => {
  //   await this.setState({ loaded: true })
  // }
  //
  // componentDidUpdate = (prevProps, prevState) => {
  // }


  render() {

    const { fetchWeeks, lable, specificRow, weekDates, weekID, individual, shift } = this.props


    if (!specificRow || !weekDates) {return ''}

    return (
      <div className='values-row-container'>
        <Value lable={ lable } date={ weekDates[0] } value={ specificRow[0] } shift={ shift } weekID={ weekID } individual={ individual } fetchWeeks={ fetchWeeks } />
        <Value lable={ lable } date={ weekDates[1] } value={ specificRow[1] } shift={ shift } weekID={ weekID } individual={ individual } fetchWeeks={ fetchWeeks } />
        <Value lable={ lable } date={ weekDates[2] } value={ specificRow[2] } shift={ shift } weekID={ weekID } individual={ individual } fetchWeeks={ fetchWeeks } />
        <Value lable={ lable } date={ weekDates[3] } value={ specificRow[3] } shift={ shift } weekID={ weekID } individual={ individual } fetchWeeks={ fetchWeeks } />
        <Value lable={ lable } date={ weekDates[4] } value={ specificRow[4] } shift={ shift } weekID={ weekID } individual={ individual } fetchWeeks={ fetchWeeks } />
        <Value lable={ lable } date={ weekDates[5] } value={ specificRow[5] } shift={ shift } weekID={ weekID } individual={ individual } fetchWeeks={ fetchWeeks } />
        <Value lable={ lable } date={ weekDates[6] } value={ specificRow[6] } shift={ shift } weekID={ weekID } individual={ individual } fetchWeeks={ fetchWeeks } />
      </div>
    )
  }
}

export default ValuesRow
