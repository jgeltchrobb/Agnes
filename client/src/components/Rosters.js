import React, { Component } from 'react'
import Header from './Header'
import Roster from './Roster'
import week from './data'


class Rosters extends Component {
  constructor(props) {
    super(props)

  }

  nextWeek = () => {
    // updates state to be the next week
  }

  previousWeek = () => {
    // updates state to be the previous week
  }

  render() {
    return (
      <div>

        <div>
          <Header
            week={week}
            nextWeek={this.nextWeek}
            previousWeek={this.previousWeek}
          />
        </div>

        <div>
          <Roster staff={week.staff} />
        </div>

      </div>
    )
  }
}



export default Rosters
