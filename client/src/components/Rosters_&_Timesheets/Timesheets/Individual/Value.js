import React, { Component } from 'react'

class Value extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { value } = this.props

    return (
      <div className='value-constainer'>

        {value.toString()}

      </div>
    )
  }
}

export default Value
