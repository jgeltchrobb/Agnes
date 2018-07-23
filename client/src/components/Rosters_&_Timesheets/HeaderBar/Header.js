import React, { Component } from 'react'
import SideBarHeading from './SideBarHeading'
import DateBar from './DateBar'
import Nav from './Nav'
import '../../../stylesheets/Header.css'

class Header extends Component {

  render() {
    const { role, weekDate, goToNextWeek, goToPreviousWeek, sideBarHeading } = this.props
    return (
      <div className="header">

    { (role !== 'admin') ? '' :
        <div className="header-sidebar">
          <SideBarHeading sideBarHeading={ sideBarHeading }/>
        </div>
    }
        <div className="header-mainbar">
          <div>
            <Nav goToPreviousWeek={ goToPreviousWeek } weekDate={ weekDate } />
          </div>

          <div>
            <DateBar weekDate={weekDate}/>
          </div>

          <div>
            <Nav goToNextWeek={goToNextWeek} weekDate={weekDate}/>
          </div>
        </div>

      </div>
    )
  }
}

export default Header
