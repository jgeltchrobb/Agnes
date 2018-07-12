import React, { Component } from 'react'
import Total from './Total'


class TotalsRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      totalsArray: [],

    }
  }

  componentDidMount = () => {
    this.setTotalsArray()
  }

  setTotalsArray = () => {

    const { row, columnHeadings } = this.props

    const totalsArray = []
    columnHeadings.map((cat) => {
      if {
        for (let key in row) {
          if (key === cat) {
            totalsArray.push(row[key])
          }
        }
      } else { totalsArray.push(row[key]) }

    })
    this.setState({
      totalsArray: totalsArray
    })
  }

  render() {

    const { row, setIndividual } = this.props

    this.setTotalsArray()

    return (
      <div  onClick={() => setIndividual(row.staffID)}>
        {
          // totalsArray is essentially a copy of display catergories for each
          // staff staffMember or row, but with totals / empty strings.
          // Then we can loop through that array in the render method and either render
          // the total (if value) or an empty div (if '')
          this.state.totalsArray.map((total) => {
            if (total) {
              return (
                <Total total={total} />
              )
            } else {
              return (
                <div>empty</div>
              )
            }
          })
        }

      </div>
    )
  }
}

export default TotalsRow
