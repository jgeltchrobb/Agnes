import React, { Component } from 'react'
import Header from '../HeaderBar/Header'
import Roster from './Roster'
import Flags from './Flags'
import '../../../stylesheets/Rosters.css'



class Rosters extends Component {


  render() {
    const { week, users, goToNextWeek, goToPreviousWeek, sideBarHeading } = this.props
    console.log(goToNextWeek, 'ASDSD')
    return (
      <div className="rosters-container">

        <div>
          <Header weekDate={week.date}
                  goToNextWeek={goToNextWeek}
                  goToPreviousWeek={goToPreviousWeek}
                  sideBarHeading={sideBarHeading}
          />
        </div>
        <div className="rosters-main">

          <div className="rosters-flags">
            <Flags staff={week.staff} />
          </div>

          <div className="rosters-date">
            <Roster users={users}
                    staff={week.staff}
                    weekDate={week.date}
                    weekID={week._id}

            />
          </div>

        </div>

      </div>
    )
  }
}



export default Rosters
