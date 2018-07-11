import React, { Component } from 'react'
import Total from './Total'


class TotalsRow extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { row, displayCategories, entitlements, setIndividual } = this.props

    const totalsArray = []
    displayCategories.map((cat) => {

      for (let key in row) {
        // look for the key that matches the catergory
        if (key === cat) {
          // if the row has a value for that catergory then push value,
          // otherwise push an empty string
          row[key] === 0 ? totalsArray.push('') : totalsArray.push(row[key])
        }
        // if no key matches then do nothing
      }
    })

    return (
      <div  onClick={() => setIndividual(row.staffID)}>
        {
          // totalsArray is essentially a copy of display catergories for each
          // staff staffMember or row, but with totals / empty strings.
          // Then we can loop through that array in the render method and either render
          // the total (if value) or an empty div (if '')
          totalsArray.map((total) => {
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
