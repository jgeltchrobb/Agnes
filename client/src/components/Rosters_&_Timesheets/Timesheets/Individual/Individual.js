import React, { Component } from 'react'
import TWeek from './TWeek'
import '../../../../stylesheets/Individual.css'

class Individual extends Component {

  nameToTop = () => {
    // Take name/id array and sort clicked name to front
  }

  // formatDate = (date) => {
  //   var dateObj = new Date(date)
  //   return (
  //     `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getYear()}`
  //   )
  // }

  render() {
    const { week, prevWeek, individual, individualTotalsRow, setIndividual, removeIndividual } = this.props
console.log(week.date)
    return (
      <div className='timesheet-card-container'>

        <div className="timesheet-card-header">
          <div className='week-date'>
            { week.date }
          </div>
          <div className='day-names-container'>
            <div> M </div><div> T </div><div> W </div><div> T </div><div> F </div><div> S </div><div> S </div>
          </div>
        </div>

        <TWeek  week={ week }
                weekID={ week._id }
                individual={ individual }
        />

        <div className="timesheet-card-header">
          <div className='week-date'>
            { prevWeek.date }
          </div>
        </div>

        <TWeek  week={ prevWeek }
                weekID={ prevWeek._id }
                individual={ individual }
        />

      </div>
    )
  }
}

export default Individual
