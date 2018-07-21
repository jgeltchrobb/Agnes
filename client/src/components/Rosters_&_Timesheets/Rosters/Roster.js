import React, { Component } from 'react'
import StaffMember from './StaffMember'
import '../../../stylesheets/Roster.css'


class Roster extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { users, weekDate, weekID, staff } = this.props
    console.log(this.props.staff, 'HERE STAFF DAWG')
    return (
      <div className="rosters-cells">

        <div className="days-header">
          <div className="days-column">
            <div></div>
            <div>MON</div>
            <div>TUES</div>
            <div>WED</div>
            <div>THURS</div>
            <div>FRI</div>
            <div>SAT</div>
            <div>SUN</div>
          </div>
        </div>

        <div className="shifts-main">
          {/* Add column headings here: M,T,W,TH,F,S,S */}
            {
              staff.map((staffMember) => {
                return (
                  <StaffMember  staffMember={ staffMember }
                                staffID={ staffMember.staffID }
                                weekDate={ weekDate }
                                users={ users }
                                weekID={ weekID }
                                fetchData={this.props.fetchData}
                                currentWeek={this.props.currentWeek}
                                weeks={this.props.weeks}
                  />
                )
              })
            }
        </div>

      </div>

    )
  }
}

export default Roster
