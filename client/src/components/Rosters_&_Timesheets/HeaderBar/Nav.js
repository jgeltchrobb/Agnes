import React, { Component } from 'react'

class Nav extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { goToNextWeek, goToPreviousWeek, weekDate } = this.props

    return (
      <div>
        {
          this.props.goToNextWeek ?
            (
              <button onClick={() => goToNextWeek()}>
                Next
              </button>
            )

          :

            (
              <button onClick={() => goToPreviousWeek()}>
                Previous
              </button>
            )
        }

      </div>
    )
  }
}

export default Nav
