import React, { Component } from 'react'
import axios from 'axios'
import Header from '../HeaderBar/Header'
import Roster from './Roster'
import Flags from './Flags/Flags'
import '../../../stylesheets/Rosters.css'

class Rosters extends Component {
  state = {
    flags: '',
  }

  componentDidMount() {
    this.fetchFlagsData()
  }

  fetchFlagsData = () => {
    const server = 'http://localhost:4000'

    axios.get(server + '/flags').then(response => {
      this.setState({
        flags: response.data[0].flags,
      })
    })
  }


  render() {
    console.log(this.props)

    const { week, users, goToNextWeek, goToPreviousWeek, sideBarHeading, weekDate } = this.props
    if (!this.state.flags) return ''
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
            <Flags  flags={ this.state.flags }
                    fetchFlagsData={ this.fetchFlagsData }
                    users={ users }
            />
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
