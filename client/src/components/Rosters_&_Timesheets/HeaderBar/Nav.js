import React, { Component } from 'react'

class Nav extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    console.log(this.props, 'PPPPPPPPPPPPP')
    const { goToNextWeek, goToPreviousWeek, weekDate } = this.props

    return (
      <div>
        {
          this.props.goToNextWeek ?
            (
              <button onClick={() => goToNextWeek(weekDate)}>
                Next
              </button>
            )

          :

            (
              <button onClick={() => goToPreviousWeek(weekDate)}>
                Previous
              </button>
            )
        }

      </div>
    )
  }
}

export default Nav
