import React, { Component } from 'react'
import SideBarHeading from './SideBarHeading'
import DateBar from './DateBar'
import Nav from './Nav'
import '../../../stylesheets/Header.css'

class Header extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { weekDate, goToNextWeek, goToPreviousWeek, sideBarHeading } = this.props

    return (
      <div className="header">

        <div className="header-sidebar">
          <SideBarHeading sideBarHeading={sideBarHeading}/>
        </div>

        <div className="header-mainbar">
          <div>
            <Nav goToPreviousWeek={goToPreviousWeek} />
          </div>

          <div>
            <DateBar weekDate={weekDate}/>
          </div>

          <div>
            <Nav goToNextWeek={goToNextWeek} />
          </div>
        </div>

      </div>
    )
  }
}

export default Header
