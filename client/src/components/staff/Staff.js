import React, { Component } from 'react'
import StaffRow from './StaffRow'
import staffData from './staffDataTest'
import SideBar from './SideBar'


class Staff extends Component {
  constructor() {
    super()
    this.state = {
      revealed: ''
    }
  }

  clickHandler = (event) => {
    if (this.state.revealed === event.target.getAttribute('name') || this.state.revealed === event.target.innerText) {
      this.setState({revealed: ''})
    } else {
      this.setState({
        revealed: event.target.getAttribute('name') || event.target.innerText
      })
    }
  }
  
  render() {
    return (
      <div className="staff-container" >
        <SideBar staffData={staffData} handleClick={this.clickHandler} revealed={this.state.revealed} />
        <StaffRow staffData={staffData} revealed={this.state.revealed} />
      </div>
    )
  }
}

export default Staff