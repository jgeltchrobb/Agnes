import React, { Component } from 'react'
import Name from '../Name'
import TotalsRow from '../TotalsRow'
import Timesheet from './Timesheet'

class Individual extends Component {
  constructor(props) {
    super(props)


  }



  nameToTop = () => {
    {/* Take name/id array and sort clicked name to front */}
  }

  render() {
    const { individual, setIndividual, removeIndividual } = this.props

    return (
      <div>

        <div className='names-constainer'>

          <Name />
        </div>

      </div>
    )
  }
}

export default Individual
