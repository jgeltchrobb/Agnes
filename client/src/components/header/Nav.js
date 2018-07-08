import React, { Component } from 'react'

class Nav extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { nextWeek, previousWeek } = this.props

    return (
      <div>
        {
          this.props.nextWeek ?
            (
              <button onClick={() => nextWeek()}>
                Next
              </button>
            )

          :

            (
              <button onClick={() => previousWeek()}>
                Previous
              </button>
            )
        }

      </div>
    )
  }
}

export default Nav
