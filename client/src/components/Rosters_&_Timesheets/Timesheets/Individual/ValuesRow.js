import React, { Component } from 'react'
import Value from './Value'

class ValuesRow extends Component {


  render() {
    const { specificRow, weekDates } = this.props

    // console.log(specificRow)

    return (
      <div className='week-constainer'>

        <div className='values-row-container'>
          {
            specificRow.map((value) => {
              return (
                <Value  value={value}
                />
              )

            })
          }
        </div>

      </div>
    )
  }
}

export default ValuesRow
