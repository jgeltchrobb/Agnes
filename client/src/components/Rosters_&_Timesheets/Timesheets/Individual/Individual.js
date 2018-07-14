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
    const { WeekPrevious, WeekBeforePrevWeek, individualTotalsRow, setIndividual, removeIndividual } = this.props

    return (
      <div className='timesheet-card-container'>

        <div className='week-date'>
          {this.formatDate(WeekPrevious.date)}
        </div>

        <div className='dayNames-container'>
          <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
        </div>

        // WEEK COMPONENT - Previous Week
        <TWeek week={WeekPrevious}/>

        <div className='week-date'>
          {this.formatDate(WeekBeforePrevWeek.date)}
        </div>

        // WEEK COMPONENT - Previous Week
        <TWeek week={WeekBeforePrevWeek}/>

      </div>
    )
  }
}

export default Individual
