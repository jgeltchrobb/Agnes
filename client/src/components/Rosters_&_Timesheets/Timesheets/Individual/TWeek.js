import React, { Component } from 'react'
import ValuesRow from './ValuesRow'

class TWeek extends Component {
  state = {
    weekDates: [],
    valuesRows: [],
  }

  componentDidMount = () => {
    this.setValuesRows()
    this.setWeekDatesArray()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.individual !== prevProps.individual) {
      this.setValuesRows()
    }
  }

  setWeekDatesArray = () => {
    const weekStartDate = new Date(this.props.week.date)
    const weekDates = []
    for (let i=0; i<7; i++) {
      let date = new Date(weekStartDate)
      date.setDate(weekStartDate.getDate() + i)
      weekDates.push(date)
    }
    this.setState({ weekDates: weekDates})
  }

  setValuesRows = () => {

    const { week, individual, shiftBreakLength } = this.props

    const weekDate = new Date(week.date)

    const valuesRows = []

    const milliToHours = 0.00000027777777777778

    const starts = []
    const finishes = []

    console.log(individual)

    week.staff.map((staffMember) => {
      if (staffMember.staffID === individual) {
        for (let day = 0; day < 7; day++) {
          let pushed = 'no'
          staffMember.shifts.map((shift) => {
            if ( (weekDate.getDate() + day) === new Date(shift.date).getDate() ) {
              shift.start.timesheet ? starts.push(new Date(shift.start.timesheet)) : starts.push('')
                // null if no timesheet time in data then creating wrong date
              shift.finish.timesheet ? finishes.push(new Date(shift.finish.timesheet)) : finishes.push('')
              // null if no timesheet time in data then creating wrong date
              pushed = 'yes'
            }
          })
          if (pushed === 'no') {
            starts.push('')
            finishes.push('')
          }
        }
      }
    })

    const breaks = []
    const totals = []
    // Now populate breaks and totals arrays based on start and finish arrays
    for (let i=0; i<7; i++) {
      if (starts[i] && finishes[i]) {
        breaks.push(shiftBreakLength)
        totals.push( (((finishes[i].getTime() - starts[i].getTime()) * milliToHours).toFixed(2)) - breaks[i]/60 )
        // totals.push()
      } else {
        breaks.push('no break')
        totals.push('no total')
      }
    }

    console.log(starts)
    console.log(finishes)
    console.log(breaks)
    console.log(totals)

    valuesRows.push(starts, breaks, finishes, totals)
    // Array of arrays (to map when rendering ValuesRow):
    // starts:    [7 start times]
    // breaks:    [7 break numbers]
    // finishes:  [7 finish times]
    // totals:    [7 totals]
    this.setState({
      valuesRows: valuesRows
    })
  }


  render() {

    if  (!this.state.valuesRows || !this.state.weekDates) {return ''}

    return (
      <div className='week-constainer'>

        <div className='headings-container'>
          <div>Start</div>
          <div>Break</div>
          <div>Finish</div>
          <div>Total</div>
        </div>

        <div className='values-block-container'>
          {
            this.state.valuesRows.map((row) => {
              return (
                <ValuesRow  specificRow={row}
                weekDates={this.state.weekDates}
                />
              )
            })
          }
        </div>

      </div>
    )
  }
}

export default TWeek
