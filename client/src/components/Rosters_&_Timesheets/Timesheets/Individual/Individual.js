import React, { Component } from 'react'
import TWeek from './TWeek'

class Individual extends Component {
  constructor(props) {
    super(props)


  }

  nameToTop = () => {
    {/* Take name/id array and sort clicked name to front */}
  }

  formatDate = (date) => {
    var dateObj = new Date(date)
    return (
      `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getYear()}`
    )

  }

  render() {
    const { week, prevWeek, individual, shiftBreakLength, individualTotalsRow, setIndividual, removeIndividual } = this.props

    return (
      <div className='timesheet-card-container'>

        <div className='week-date'>
          {this.formatDate(week.date)}
        </div>

        <div className='dayNames-container'>
          <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
        </div>

        // WEEK COMPONENT - Current Week
        <TWeek  week={week}
                individual={individual}
                shiftBreakLength={shiftBreakLength}
        />

        <div className='week-date'>
          {this.formatDate(prevWeek.date)}
        </div>

        // WEEK COMPONENT - Previous Week
        <TWeek  week={prevWeek}
                individual={individual}
                shiftBreakLength={shiftBreakLength}
        />

      </div>
    )
  }
}

export default Individual
