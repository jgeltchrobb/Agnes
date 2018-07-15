import React, { Component } from 'react'
import Value from './Value'

class ValuesRow extends Component {


  render() {
    const { specificRow, weekDates } = this.props

    // console.log(specificRow)

    return (
      <div className='week-constainer'>

        <div className='values-row-container'>
          <Value date={weekDates[0]} value={specificRow[0]} />
          <Value date={weekDates[1]} value={specificRow[1]} />
          <Value date={weekDates[2]} value={specificRow[2]} />
          <Value date={weekDates[3]} value={specificRow[3]} />
          <Value date={weekDates[4]} value={specificRow[4]} />
          <Value date={weekDates[5]} value={specificRow[5]} />
          <Value date={weekDates[6]} value={specificRow[6]} />
        </div>

      </div>
    )
  }
}

export default ValuesRow
