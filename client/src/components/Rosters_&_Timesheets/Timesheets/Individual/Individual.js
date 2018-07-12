import React, { Component } from 'react'
import Name from '../Common/Name'
import TotalsRow from '../Common/TotalsRow'

class Individual extends Component {
  constructor(props) {
    super(props)


  }

  nameToTop = () => {
    {/* Take name/id array and sort clicked name to front */}
  }

  render() {
    const { displayTotalsRows, setIndividual, removeIndividual } = this.props

    return (
      <div>

        Here we put the individual timesheet info for two week
      </div>
    )
  }
}

export default Individual
