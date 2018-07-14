import React, { Component } from 'react'
import Value from './Value'

class ValuesRow extends Component {
  constructor(props) {
    super(props)

  }

  render() {

    return (
      <div className='week-constainer'>

        <div className='values-row-container'>
          <Value />
        </div>

      </div>
    )
  }
}

export default ValuesRow
