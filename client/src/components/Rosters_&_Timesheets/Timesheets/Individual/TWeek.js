import React, { Component } from 'react'
import ValuesRow from './ValuesRow'

class TWeek extends Component {
  state = {
    // weekDates: [],
    valuesRows1: [],
    valuesRows2: [],
    valuesRows3: [],
  }

  componentDidMount = () => {
    this.setValuesRows()
    // this.setWeekDatesArray(this.props.week.date)
  }

  componentDidUpdate = (prevProps, prevState) => {
    // if (this.props.week.date !== prevProps.week.date) {
    //   this.setWeekDatesArray(this.props.week.date)
    // }
    if (this.props.week.date !== prevProps.week.date || this.props.individual !== prevProps.individual) {
      this.setValuesRows()
    }
  }

  // setWeekDatesArray = (dateString) => {
  //   const weekStartDate = new Date(dateString)
  //   const weekDates = []
  //   for (let i=0; i<7; i++) {
  //     let date = new Date(weekStartDate)
  //     date.setDate(weekStartDate.getDate() + i)
  //     weekDates.push(date)
  //   }
  //   this.setState({ weekDates: weekDates})
  // }

  setValuesRows = () => {
    const { week, individual } = this.props
    const weekDate = new Date(week.date)
    const milliToHours = 0.00000027777777777778
    const valuesRows1 = []
    const valuesRows2 = []
    const valuesRows3 = []
    const starts1   = { start: [] }
    const starts2   = { start: [] }
    const starts3   = { start: [] }
    const finishes1 = { finish: [] }
    const finishes2 = { finish: [] }
    const finishes3 = { finish: [] }

    week.staff.map((staffMember) => {
      if (staffMember.staffID === individual) {
        var date = new Date(weekDate)
        for (let day = 0; day < 7; day++) {
          new Date(date.setDate(weekDate.getDate() + day))
          var starts1Pushed = false
          var starts2Pushed = false
          var starts3Pushed = false
          staffMember.shifts.map((shift) => {
            if ( (weekDate.getDate() + day) === new Date(shift.date).getDate() ) {
              if (starts1Pushed === false) {
                shift.start.timesheet   ? starts1.start.push    ( { date: date, time: new Date(shift.start.timesheet) } )
                                        : starts1.start.push    ( { date: date, time: '' } )
                shift.finish.timesheet  ? finishes1.finish.push ( { date: date, time: new Date(shift.finish.timesheet) } )
                                        : finishes1.finish.push ( { date: date, time: '' } )
                starts1Pushed = true
                return
              }
              if (starts2Pushed === false) {
                shift.start.timesheet   ? starts2.start.push    ( { date: date, time: new Date(shift.start.timesheet) } )
                                        : starts2.start.push    ( { date: date, time: '' } )
                shift.finish.timesheet  ? finishes2.finish.push ( { date: date, time: new Date(shift.finish.timesheet) } )
                                        : finishes2.finish.push ( { date: date, time: '' } )
                starts2Pushed = true
                return
              }
              if (starts3Pushed === false) {
                shift.start.timesheet   ? starts3.start.push    ( { date: date, time: new Date(shift.start.timesheet) } )
                                        : starts3.start.push    ( { date: date, time: '' } )
                shift.finish.timesheet  ? finishes3.finish.push ( { date: date, time: new Date(shift.finish.timesheet) } )
                                        : finishes3.finish.push ( { date: date, time: '' } )
                starts3Pushed = true
              }
            }
          })
          if (starts1Pushed === false) {
            starts1.start.push(     { date: (weekDate.getDate() + day), time: '' } )
            finishes1.finish.push(  { date: (weekDate.getDate() + day), time: '' } )
          }
          if (starts2Pushed === false) {
            starts2.start.push(     { date: (weekDate.getDate() + day), time: '' } )
            finishes2.finish.push(  { date: (weekDate.getDate() + day), time: '' } )
          }
          if (starts3Pushed === false) {
            starts3.start.push(     { date: (weekDate.getDate() + day), time: '' } )
            finishes3.finish.push(  { date: (weekDate.getDate() + day), time: '' } )
          }
        }
      }
    })
    const breaks1 = { break: [] }
    const breaks2 = { break: [] }
    const breaks3 = { break: [] }

    const totals1 = { total: [] }
    const totals2 = { total: [] }
    const totals3 = { total: [] }

    for (let i=0; i<7; i++) {
      if (starts1.start[i].time && finishes1.finish[i].time) {
        let subTotal1 = ((finishes1.finish[i].time.getTime() - starts1.start[i].time.getTime()) * milliToHours).toFixed(2)
        subTotal1 > 4 ? breaks1.break.push(30) : breaks1.break.push(15)
        totals1.total.push( subTotal1 - (breaks1.break[i]/60) )
      } else {
        breaks1.break.push('no break')
        totals1.total.push('no total')
      }
      if (starts2.start && finishes2.finish) {
        if (starts2.start[i].time && finishes2.finish[i].time) {
          let subTotal2 = ((finishes2.finish[i].time.getTime() - starts2.start[i].time.getTime()) * milliToHours).toFixed(2)
          subTotal2 > 4 ? breaks2.break.push(30) : breaks2.break.push(15)
          totals2.total.push( subTotal2 - (breaks2.break[i]/60) )
        } else {
          breaks2.break.push('no break')
          totals2.total.push('no total')
        }
      }
      if (starts3.start && finishes3.finish) {
        if (starts3.start[i].time && finishes3.finish[i].time) {
          let subTotal3 = ((finishes3.finish[i].time.getTime() - starts3.start[i].time.getTime()) * milliToHours).toFixed(2)
          subTotal3 > 4 ? breaks3.break.push(30) : breaks3.break.push(15)
          totals3.total.push( subTotal3 - (breaks3.break[i]/60) )
        } else {
          breaks3.break.push('no break')
          totals3.total.push('no total')
        }
      }
    }
    valuesRows1.push(starts1, breaks1, finishes1, totals1)

    if  (
          starts2.start[0].time ||
          starts2.start[1].time ||
          starts2.start[2].time ||
          starts2.start[3].time ||
          starts2.start[4].time ||
          starts2.start[5].time ||
          starts2.start[6].time
        )
    {
      valuesRows2.push(starts2, breaks2, finishes2, totals2)
    }
    if  (
          starts3.start[0].time ||
          starts3.start[1].time ||
          starts3.start[2].time ||
          starts3.start[3].time ||
          starts3.start[4].time ||
          starts3.start[5].time ||
          starts3.start[6].time
        )
    {
      valuesRows3.push(starts3, breaks3, finishes3, totals3)
    }

    this.setState({
      valuesRows1: valuesRows1,
      valuesRows2: valuesRows2,
      valuesRows3: valuesRows3,
    })
  }


  render() {

    if  (!this.state.valuesRows1) {return ''}

    return (

      <div className='week-constainer'>
{/*
        <div className='headings-container'>
          <div>Start</div>
          <div>Break</div>
          <div>Finish</div>
          <div>Total</div>
        </div>
*/}
        <div className='values-block-container'>
          {
            this.state.valuesRows1.map((row) => {
              return (
                <ValuesRow  specificRow={row}
                            // weekDates={this.state.weekDates}
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
