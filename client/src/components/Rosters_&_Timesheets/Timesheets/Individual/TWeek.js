import React, { Component } from 'react'
import ValuesRow from './ValuesRow'

class TWeek extends Component {
  state = {
    weekDates: [],
    valuesRows1: [],
    valuesRows2: [],
    valuesRows3: [],
  }

  componentDidMount = () => {
    this.setValuesRows()
    this.setWeekDatesArray(this.props.week.date)
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.week.date !== prevProps.week.date) {
      this.setWeekDatesArray(this.props.week.date)
    }
    if (this.props.week.date !== prevProps.week.date || this.props.individual !== prevProps.individual) {
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
    const { week, individual } = this.props
    const weekDate = new Date(week.date)
    const milliToHours = 0.00000027777777777778
    const valuesRows1 = []
    const valuesRows2 = []
    const valuesRows3 = []
    const starts1   = []
    const starts2   = []
    const starts3   = []
    const finishes1 = []
    const finishes2 = []
    const finishes3 = []

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
                shift.start.timesheet   ? starts1.push(new Date(shift.start.timesheet))
                                        : starts1.push('')
                shift.finish.timesheet  ? finishes1.push(new Date(shift.finish.timesheet))
                                        : finishes1.push('')
                starts1Pushed = true
                return
              }
              if (starts2Pushed === false) {
                shift.start.timesheet   ? starts2.push(new Date(shift.start.timesheet))
                                        : starts2.push('')
                shift.finish.timesheet  ? finishes2.push(new Date(shift.finish.timesheet))
                                        : finishes2.push('')
                starts2Pushed = true
                return
              }
              if (starts3Pushed === false) {
                shift.start.timesheet   ? starts3.push(new Date(shift.start.timesheet))
                                        : starts3.push('')
                shift.finish.timesheet  ? finishes3.push(new Date(shift.finish.timesheet))
                                        : finishes3.push('')
                starts3Pushed = true
              }
            }
          })
          if (starts1Pushed === false) {
            starts1.push('')
            finishes1.push('')
          }
          if (starts2Pushed === false) {
            starts2.push('')
            finishes2.push('')
          }
          if (starts3Pushed === false) {
            starts3.push('')
            finishes3.push('')
          }
        }
      }
    })
    const breaks1 = []
    const breaks2 = []
    const breaks3 = []

    const totals1 = []
    const totals2 = []
    const totals3 = []

    for (let i=0; i<7; i++) {
      if (starts1[i] && finishes1[i]) {
        let subTotal1 = ((finishes1[i].getTime() - starts1[i].getTime()) * milliToHours).toFixed(2)
        subTotal1 > 4 ? breaks1.push(30) : breaks1.push(15)
        totals1.push( subTotal1 - (breaks1[i]/60) )
      } else {
        breaks1.push('no break')
        totals1.push('no total')
      }
      if (starts2 && finishes2) {
        if (starts2[i] && finishes2[i]) {
          let subTotal2 = ((finishes2[i].getTime() - starts2[i].getTime()) * milliToHours).toFixed(2)
          subTotal2 > 4 ? breaks2.push(30) : breaks2.push(15)
          totals2.push( subTotal2 - (breaks2[i]/60) )
        } else {
          breaks2.push('no break')
          totals2.push('no total')
        }
      }
      if (starts3 && finishes3) {
        if (starts3[i] && finishes3[i]) {
          let subTotal3 = ((finishes3[i].getTime() - starts3[i].getTime()) * milliToHours).toFixed(2)
          subTotal3 > 4 ? breaks3.push(30) : breaks3.push(15)
          totals3.push( subTotal3 - (breaks3[i]/60) )
        } else {
          breaks3.push('no break')
          totals3.push('no total')
        }
      }
    }
    valuesRows1.push(starts1, breaks1, finishes1, totals1)

    if  (starts2.join('')) { valuesRows2.push(starts2, breaks2, finishes2, totals2) }
    if  (starts3.join('')) { valuesRows3.push(starts3, breaks3, finishes3, totals3) }

    this.setState({
      valuesRows1: valuesRows1,
      valuesRows2: valuesRows2,
      valuesRows3: valuesRows3,
    })
  }


  render() {
    const { valuesRows1, valuesRows2, valuesRows3, weekDates } = this.state

    if (valuesRows2.length === 0) {
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
              valuesRows1.map((row) => {
                return (
                  <ValuesRow  specificRow={ row }
                              weekDates={ weekDates }
                  />
                )
              })
            }
          </div>
        </div>
      )
    }


    if (valuesRows2.length > 0 && valuesRows3.length === 0) {
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
              valuesRows1.map((row) => {
                return (
                  <ValuesRow  specificRow={ row }
                              weekDates={ weekDates }
                  />
                )
              })
            }
          </div>
          <div className='extra-div-required'>
            <div>Start</div>
            <div>Break</div>
            <div>Finish</div>
            <div>Total</div>
          </div>
          <div className='values-block-container'>
            {
              valuesRows2.map((row) => {
                return (
                  <ValuesRow  specificRow={ row }
                              weekDates={ weekDates }
                  />
                )
              })
            }
          </div>
        </div>
      )
    }
    if (valuesRows3.length > 0) {
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
              valuesRows1.map((row) => {
                return (
                  <ValuesRow  specificRow={ row }
                              weekDates={ weekDates }
                  />
                )
              })
            }
          </div>
          <div className='extra-div-required'>
            <div>Start</div>
            <div>Break</div>
            <div>Finish</div>
            <div>Total</div>
          </div>
          <div className='values-block-container'>
            {
              valuesRows2.map((row) => {
                return (
                  <ValuesRow  specificRow={ row }
                              weekDates={ weekDates }
                  />
                )
              })
            }
          </div>
          <div className='extra-div-required'>
            <div>Start</div>
            <div>Break</div>
            <div>Finish</div>
            <div>Total</div>
          </div>
          <div className='values-block-container'>
            {
              valuesRows3.map((row) => {
                return (
                  <ValuesRow  specificRow={ row }
                              weekDates={ weekDates }
                  />
                )
              })
            }
          </div>
        </div>
      )
    }

  }

}

export default TWeek
