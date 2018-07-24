import React, { Component } from 'react'
import Total from './Total'
import '../../../../stylesheets/TotalsRow.css'


class TotalsRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // totalsArray: Array of totals for each columnHeading (which include applicable payRateCategories and all entitlements)
      // e.g. if the only applicable payRateCategory for the week is 'Ordinary' and there are 4 entitlements in the database then it might be:
        // [ 38, '', '', '', '']
      totalsArray: [],
    }
  }

  componentDidMount = () => {
    this.setTotalsArray()
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.row !== prevProps.row) {
      this.setTotalsArray()
    }
  }

  setTotalsArray = () => {
    const { row, columnHeadings } = this.props

    const totalsArray = []
    columnHeadings.map((cat) => {
      let pushed = 'no'
      for (let key in row) {
        if (key === cat) {
          totalsArray.push(row[key])
          pushed = 'yes'
        }
      }
      if (pushed === 'no') { totalsArray.push('-') }
    })
    this.setState({
      totalsArray: totalsArray
    })
  }

  render() {
    const { row, setIndividual } = this.props

    return (
      <div onClick={() => setIndividual(row.staffID)} className="individual-timesheet">
        {
          this.state.totalsArray.map((total, index) => {
            return (
              <Total key={index} total={total} />
            )
          })
        }

      </div>
    )
  }
}

export default TotalsRow
