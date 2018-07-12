import React, { Component } from 'react'

class TotalsRow extends Component {
  constructor(props) {
    super(props)


  }

  render() {
    const { row } = this.props

    const array = []
    for (let cat in row) {
      array.push(`${cat}: ${row[cat]}, `)
    }

    return (
      <div>
        {array}
      </div>
    )
  }
}

export default TotalsRow
