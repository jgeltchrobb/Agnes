import React, { Component } from 'react'

class Nav extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { week } = this.props
    return (
      <div>
        {
          this.props.nextWeek ?
          (
              <button onClick={() => this.props.nextWeek()}>
                Next
              </button>
          )
          :
          (
              <button onClick={() => this.props.previousWeek()}>
                Previous
              </button>
          )
        }

      </div>
    )
  }
}

export default Nav
