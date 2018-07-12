import React, { Component } from 'react'

class SideBarHeading extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { sideBarHeading } = this.props
    return (
      <div>

        {sideBarHeading}

      </div>
    )
  }
}

export default SideBarHeading
