import React, { Component } from 'react'

class Total extends Component {
  constructor(props) {
    super(props)


  }

  render() {
    const { total } = this.props

    return (
      <div>

      {total}

      </div>
    )
  }
}

export default Total
