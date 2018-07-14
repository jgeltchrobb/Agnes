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
    const { weekDate, nextWeek, previousWeek, sideBarHeading } = this.props

    return (
      <div className="header">

        <div className="header-sidebar">
          <SideBarHeading sideBarHeading={sideBarHeading}/>
        </div>

        <div className="header-mainbar">
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
