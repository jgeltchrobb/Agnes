import React, { Component } from 'react'
import SideBarHeading from './SideBarHeading'
import DateBar from './DateBar'
import Nav from './Nav'
import '../../../stylesheets/Header.css'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: ''
    }
  }

  componentDidMount = () => {
    this.setState({date: this.props.currentWeek.date})
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
            <Nav goToPreviousWeek={goToPreviousWeek} weekDate={this.state.date} />
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
