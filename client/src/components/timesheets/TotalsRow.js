import React, { Component } from 'react'

class TotalsRow extends Component {
  constructor(props) {
    super(props)


  }

  render() {
    const { row } = this.props

    console.log(row)

    const allCategories = [
      'Ordinary', 'Sat', 'Sun', 'Night', 'Public Holiday',
      'Wayne Ordinary', 'Wayne Sat', 'Wayne Sun', 'Wayne Night', 'Wayne Public Holiday',
      'Annual Leave', 'Sick Leave', 'Long Service Leave', 'Sleep-over Bonus'
    ]

    return (
      <div>
        
      </div>
    )
  }
}

export default TotalsRow
