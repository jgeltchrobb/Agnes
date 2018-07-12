
import React, { Component } from 'react'

class DisplayCategory extends Component {
  constructor(props) {
    super(props)


  }

  render() {
    const { columnHeading } = this.props

    return (
      <div>

        { columnHeading }

      </div>
    )
  }
}

export default DisplayCategory
