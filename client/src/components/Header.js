import React, { Component } from 'react'
import DateBar from './DateBar'
import Nav from './Nav'

class Header extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { week, nextWeek, previousWeek } = this.props
    return (
      <div>

        <div>
          <Nav
            week={week}
            previousWeek={previousWeek}
          />
        </div>

        <div>
          <Nav
            week={week}
            nextWeek={nextWeek}
          />
        </div>

      </div>
    )
  }
}

export default Header
