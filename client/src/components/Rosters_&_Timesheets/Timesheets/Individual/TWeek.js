import React, { Component } from 'react'
import ValuesRow from './ValuesRow'

class TWeek extends Component {
  state = {
    weekDates: [],
    valuesRows: [],
  }

  componentDidMount = () => {
    this.setValuesRows()
    this.setWeekDatesArray(this.props.week.date)
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.individual !== prevProps.individual) {
      this.setValuesRows()
    }
  }

  setWeekDatesArray = (dateString) => {
    const weekStartDate = new Date(dateString)
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

    week.staff.map((staffMember) => {
      if (staffMember.staffID === individual) {
        for (let day = 0; day < 7; day++) {
        let pushed = 'no'
          staffMember.shifts.map((shift) => {
            if ( (weekDate.getDate() + day) === new Date(shift.date).getDate() ) {
              shift.start.timesheet ? starts.push(new Date(shift.start.timesheet)) : starts.push('')
              shift.finish.timesheet ? finishes.push(new Date(shift.finish.timesheet)) : finishes.push('')
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

    for (let i=0; i<7; i++) {
      if (starts[i] && finishes[i]) {
        breaks.push(shiftBreakLength)
        totals.push( (((finishes[i].getTime() - starts[i].getTime()) * milliToHours).toFixed(2)) - breaks[i]/60 )
      } else {
        breaks.push('no break')
        totals.push('no total')
      }
    }
    valuesRows.push(starts, breaks, finishes, totals)

    this.setState({ valuesRows: valuesRows })
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
