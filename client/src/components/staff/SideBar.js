import React from 'react'
import RosterTotalCell from './cells/RosterTotalCell';

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totals: []
    }
  }

  componentWillMount() {
    let categories = this.props.categories
    console.log(this.props)
    let total = []
    for (let key in categories) {
      console.log(key)
      if (categories.hasOwnProperty(key)) {
          total.push(categories[key])
      }
    }
    console.log(total)
  }

  render() {
    return (
      <div className="sidebar" >
        {this.props.staffData.map((staff) => {
          if (this.props.revealed === staff.staff) {
            console.log(staff, 'asstaff')
            return (
              <div className="sidebar-section" >
                <div className="name-plates" >
                  <div className="cell" name={staff.staff} onClick={this.props.handleClick} ><h4>{staff.staff}</h4></div>
                  <div className="cell" >
                    <h4>Rostered</h4>
                  </div>
                </div>
                <div className="roster-plates" >
                  <div className="cell" >
                    <h4>Total</h4>
                    {staff.total}
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
                <div className="cell" name={staff.staff} onClick={this.props.handleClick} ><h4>{staff.staff}</h4></div>
                <div className="cell" >
                  <h4>Total</h4>
                  {staff.total}
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