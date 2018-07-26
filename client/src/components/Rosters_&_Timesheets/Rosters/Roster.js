import React, { Component } from 'react'
import StaffMember from './StaffMember'
import '../../../stylesheets/Roster.css'


class Roster extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { users, weekDate, weekID, staff } = this.props
    return (
      <div className="rosters-cells">

        <div className="days-header">
          <div className="days-column">
            <div></div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
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
                                role={ this.props.role }
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
