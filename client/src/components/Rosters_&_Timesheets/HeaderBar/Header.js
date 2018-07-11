import React, { Component } from 'react'
import SideBarHeading from './SideBarHeading'
import DateBar from './DateBar'
import Nav from './Nav'

class Header extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { weekDate, nextWeek, previousWeek, sideBarHeading } = this.props

    return (
      <div>

        <div>
          <SideBarHeading sideBarHeading={sideBarHeading}/>
        </div>

        <div>

          <div>
            <Nav previousWeek={previousWeek} />
          </div>

          <div>
            <DateBar weekDate={weekDate}/>
          </div>

          <div>
            <Nav nextWeek={nextWeek} />
          </div>

        </div>

      </div>
    )
  }
}

export default Header
