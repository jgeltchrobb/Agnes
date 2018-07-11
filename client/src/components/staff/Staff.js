import React, { Component } from 'react'
import StaffRow from './StaffRow'
import staffData from './staffDataTest'
import SideBar from './SideBar'


class Staff extends Component {
  constructor() {
    super()
    this.state = {
      revealed: '',
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

  // componentWillMount() {
  //   // let standardTotals = [...this.state.standardTotals]
  //   let standardTotals = []
  //   for (let staff of staffData) {
  //     // totals.push({name: staff.staff, categories: staff.categories})
  //     for (let key in staff.categories) {
  //       if (staff.categories.hasOwnProperty(key)) {
  //         standardTotals.push({name: staff.staff, standard: staff.categories[key].standard})
  //           console.log(staff.categories[key].standard)
  //         // standardTotals.push(staff.categories[key])
  //       }
  //     }
  //   }
  //   let finalTotals = []
  //   for (let standard of standardTotals) {
  //     if 
  //   }
  //   // this.setState({totals})
  //   console.log(standardTotals, 'standardTotals')
  // }
  
  render() {
    console.log(this.state.totals)
    return (
      <div className="staff-container" >
        <SideBar staffData={staffData} handleClick={this.clickHandler} revealed={this.state.revealed} />
        <div className="staff-row-container" >
          <StaffRow staffData={staffData} revealed={this.state.revealed} />
        </div>
      </div>
    )
  }
}

export default Staff