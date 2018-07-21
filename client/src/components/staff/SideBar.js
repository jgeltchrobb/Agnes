import React from 'react'
import RosterTotalCell from './cells/RosterTotalCell';
import NameHeaderCell from './cells/NameHeaderCell';
import '../../stylesheets/SideBar.css'

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      staffData: [],
      rosteredTotal: ''
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.staffData !== this.props.staffData) {
      this.calcRosterTotal(this.props.staffData)
    }
  }

  calcRosterTotal = (staffData) => {
    for (let staff of staffData) {
      let rostTotal = 0
      for (let obj of this.props.totals) {
        if (obj.staffID === staff.staffID) {
          for (let key of Object.keys(obj)) {
            if (key !== 'staffID') {
              rostTotal += obj[key]
            }
          }
        }
      }
      staff.rosteredTotal = rostTotal
    }
    this.setState({staffData})
  }

  render() {
    return (
      <div className="sidebar" >
        <div className="sidebar-section">
          <NameHeaderCell />
        </div>
        {this.state.staffData.map((staff) => {
          if (this.props.revealed === staff.name) {
            return (
              <div className="sidebar-section" >
                <div className="name-plates" >
                  <div className="cell" name={staff.name} onClick={this.props.handleClick} ><h4>{staff.name}</h4></div>
                  <div className="cell" >
                    <h4>Rostered</h4>
                  </div>
                </div>
                <div className="roster-plates" >
                  <div className="cell" >
                    {/* <h4>Total</h4> */}
                    {localStorage.getItem(`${staff.name}`)}
                  </div>
                  <div className="cell" >
                    <RosterTotalCell rostered={staff.rosteredTotal} />
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <div className="sidebar-section" >
                <div className="cell" name={staff.name} onClick={this.props.handleClick} ><h4>{staff.name}</h4></div>
                <div className="cell" >
                  {/* <h4>Total</h4> */}
                  {localStorage.getItem(`${staff.name}`)}
                </div>
              </div>
            )
          }
        })}
      </div>
    )



  }
}

export default SideBar
