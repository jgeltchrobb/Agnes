import React, { Component } from 'react'
import ValuesRow from './ValuesRow'

class TWeek extends Component {
  state = {
    valuesRows: [],
  }

  componentDidMount = () => {
    this.setValuesRows()
  }

  setValuesRows = () => {
    // const { week } = this.props
    //
    // week.staff.map((staffMember) => {
    //   staffMember.shifts.map((shift) => {
    //
    //   })
    // })
    //
    // console.log(week)
  }

  render() {

    return (
      <div className='week-constainer'>

        <div className='headings-container'>
          <div>Start</div>
          <div>Break</div>
          <div>Finish</div>
          <div>Total</div>
        </div>

        <div className='values-block-container'>
          <ValuesRow />
        </div>

      </div>
    )
  }
}

export default TWeek
