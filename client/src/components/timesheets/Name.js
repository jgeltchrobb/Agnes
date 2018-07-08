import React, { Component } from 'react'

class Name extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { staffID } = this.props

    return (
      <div>
        {/* {
          if (individual) {
          if (individual == staffID) {
          trigger callback to put this name at the start of the array
        } else {
        change className to grey out
        }
        } */}

        {/* Need to query the user model for name */}
        { staffID }

      </div>

    )
  }
}

export default Name
