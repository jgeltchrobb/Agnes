import React, { Component } from 'react'
import '../../../stylesheets/Nav.css'

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
              <button className="nav-button" onClick={() => goToNextWeek()}>
                Next
              </button>
            )

          :

            (
              <button className="nav-button" onClick={() => goToPreviousWeek()}>
                Previous
              </button>
            )
        }

      </div>
    )
  }
}

export default Nav
