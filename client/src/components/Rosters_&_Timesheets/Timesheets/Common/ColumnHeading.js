
import React, { Component } from 'react'

class columnHeading extends Component {
  constructor(props) {
    super(props)


  }

  render() {
    const { columnHeading } = this.props

    return (
      <div>
        <p>{ columnHeading }</p>
      </div>
    )
  }
}

export default columnHeading
