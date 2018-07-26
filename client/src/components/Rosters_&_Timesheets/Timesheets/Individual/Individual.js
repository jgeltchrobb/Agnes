import React, { Component } from 'react'
import TWeek from './TWeek'
import '../../../../stylesheets/Individual.css'

class Individual extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     week: this.props.week,
  //     prevWeek: this.props.prevWeek,
  //   }
  // }

  // componentDidUpdate = () => {
  //   if (this.props.) {
  //
  //   }
  // }

  // formatDate = (date) => {
  //   var dateObj = new Date(date)
  //   return (
  //     `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getYear()}`
  //   )
  // }

  render() {
    const {  week, prevWeek, fetchWeeks, individual, setIndividual, removeIndividual } = this.props
    // const { week, prevWeek } = this.state
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
                fetchWeeks={ fetchWeeks }
                weekID={ week._id }
                individual={ individual }
        />

      {
        (prevWeek) ?
        <div>
          <div className="timesheet-card-header">
            <div className='week-date'>
              { prevWeek.date }
            </div>
          </div>

          <TWeek  week={ prevWeek }
                  fetchWeeks={ fetchWeeks }
                  weekID={ prevWeek._id }
                  individual={ individual }
          />
        </div>
        : ''
      }

      </div>
    )
  }
}

export default Individual
