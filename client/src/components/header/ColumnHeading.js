import React, { Component } from 'react'

class ColumnHeading extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { columnHeading } = this.props
    return (
      <div>

        {columnHeading}

      </div>
    )
  }
}

export default ColumnHeading
