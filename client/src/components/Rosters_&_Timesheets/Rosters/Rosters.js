import React, { Component } from 'react'
import Header from '../HeaderBar/Header'
import Roster from './Roster'
import Flags from './Flags'
import '../../../stylesheets/Rosters.css'



class Rosters extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { week, users, nextWeek, previousWeek, sideBarHeading } = this.props

    return (
      <div className="rosters-container">

        <div>
          <Header weekDate={week.date}
                  nextWeek={nextWeek}
                  previousWeek={previousWeek}
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
