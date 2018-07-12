import React, { Component } from 'react'
import Total from './Total'


class TotalsRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      totalsArray: [],

    }
  }

  setTotalsArray = () => {
    const { row, columnHeadings } = this.props

    const totalsArray = []
    columnHeadings.map((cat) => {
      let pushed = 'no'
      for (let key in row) {
        if (key === cat) {
          pushed = 'yes'
          totalsArray.push(row[key])
        }
      }
      if (pushed === 'no') { totalsArray.push('empty') }
    })
    this.setState({
      totalsArray: totalsArray
    })
  }

  componentDidMount = () => {
    const { row, setIndividual } = this.props
    this.setTotalsArray()
  }

  componentDidUpdate = (prevProps) => {
    if (!this.props === prevProps) {
      this.setTotalsArray()
    }
  }

  render() {
    const { row, setIndividual } = this.props

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
