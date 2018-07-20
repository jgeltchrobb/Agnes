import React, { Component } from 'react'
import Header from '../HeaderBar/Header'
import Roster from './Roster'
import Flags from './Flags'
import '../../../stylesheets/Rosters.css'



class Rosters extends Component {


  render() {
    console.log(this.props, 'UPPEr')
    const { week, users, goToNextWeek, goToPreviousWeek, sideBarHeading } = this.props
    return (
      <div className="rosters-container">

        <div>
          <Header weekDate={ week.date }
                  goToNextWeek={ goToNextWeek }
                  goToPreviousWeek={ goToPreviousWeek }
                  sideBarHeading={ sideBarHeading }
                  week={ week }
          />
        </div>
        <div className="rosters-main">

          <div className="rosters-flags">
            <Flags staff={ week.staff } />
          </div>

          <div className="rosters-date">
            <Roster users={users}
                    staff={this.props.currentWeek.staff}
                    weekDate={this.props.currentWeek.date}
                    weekID={this.props.currentWeek._id}
                    fetchData={this.props.fetchData}
                    currentWeek={this.props.currentWeek}

            />
          </div>

        </div>

      </div>
    )
  }
}



export default Rosters
