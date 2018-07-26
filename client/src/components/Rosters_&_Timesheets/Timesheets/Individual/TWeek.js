import React, { Component } from 'react'
import ValuesRow from './ValuesRow'
import '../../../../stylesheets/TWeek.css'

class TWeek extends Component {
  state = {
    // weekDates: Array of 7 date objects (one for every day of the week, starting with Monday)
    weekDates: [],
    // valuesRows: Per staff member. (one values row for each possible shift of 3 - So valuesRows2['2'] will stay empty if only one shift that day)
      // Object with one key which corresponds to an Array of 4 arrays, arr1 has 7 start time objects ('' is n/a), arr2 has 7 breaks # ('' if n/a), arr3 has 7 finish time objects ('' is n/a), arr2 has 7 totals # ('' if n/a)
      // e.g { '#': [ [timeObj, timeObj, timeObj,...], [#, #, #,...], [timeObj, timeObj, timeObj,...], [#, #, #,...] ] }
    valuesRows1: { '1': [] },
    valuesRows2: { '2': [] },
    valuesRows3: { '3': [] },
    // grandTotalsRow: Per staff member. Only set if more than one shift that day, otherwise = ''
      // Array of 7 values, which are the sum of the total shift hours for each day.
      // e.g. [ 7.5, 6, '', 8, '', 6.5, '' ]
    grandTotalsRow: '',
  }

  componentDidMount = () => {
    this.setValuesRows()
    this.setWeekDatesArray()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.individual !== prevProps.individual || this.props.week !== prevProps.week || this.props.prevWeek !== prevProps.prevWeek) {
      this.setValuesRows()
    }
  }

  setWeekDatesArray = () => {
    const weekDate = new Date(this.props.week.date)
    const weekDates = []
    for (let i=0; i<7; i++) {
      let date = new Date(weekDate)
      date.setDate(weekDate.getDate() + i)
      weekDates.push(date)
    }
    this.setState({ weekDates: weekDates })
  }

  setValuesRows = () => {
    const { week, individual } = this.props
    const weekDate = new Date(week.date)
    const milliToHours = 0.00000027777777777778
    const valuesRows1 = { '1': [] }
    const valuesRows2 = { '2': [] }
    const valuesRows3 = { '3': [] }
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
            if ( date.getDate() === new Date(shift.date).getDate() ) {
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
        breaks1.push('')
        totals1.push(0)
      }
      if (starts2 && finishes2) {
        if (starts2[i] && finishes2[i]) {
          let subTotal2 = ((finishes2[i].getTime() - starts2[i].getTime()) * milliToHours).toFixed(2)
          subTotal2 > 4 ? breaks2.push(30) : breaks2.push(15)
          totals2.push( subTotal2 - (breaks2[i]/60) )
        } else {
          breaks2.push('')
          totals2.push(0)
        }
      }
      if (starts3 && finishes3) {
        if (starts3[i] && finishes3[i]) {
          let subTotal3 = ((finishes3[i].getTime() - starts3[i].getTime()) * milliToHours).toFixed(2)
          subTotal3 > 4 ? breaks3.push(30) : breaks3.push(15)
          totals3.push( subTotal3 - (breaks3[i]/60) )
        } else {
          breaks3.push('')
          totals3.push(0)
        }
      }
    }
    valuesRows1['1'].push(starts1, breaks1, finishes1, totals1)

    if  (starts2.join('')) {
      valuesRows2['2'].push(starts2, breaks2, finishes2, totals2)
    }
    if  (starts3.join('')) {
      valuesRows3['3'].push(starts3, breaks3, finishes3, totals3)
    }
    // sum totals for shift 2 (total2). If > 0 set a grandTotalsRow to add totals for each shit and show a grand total
    const sumTotals2 = totals2.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue}, 0)
    if (sumTotals2 > 0) {
      const grandTotalsRow = []
      for (let i=0; i<7; i++) {
        grandTotalsRow.push(totals1[i] + totals2[i] + totals3[i])
      }
      this.setState({ grandTotalsRow: grandTotalsRow })
    }

    this.setState({
      valuesRows1: valuesRows1,
      valuesRows2: valuesRows2,
      valuesRows3: valuesRows3,
    })

  }


  render() {
    const { weekID, individual } = this.props
    const { valuesRows1, valuesRows2, valuesRows3, weekDates, grandTotalsRow } = this.state
    // console.log('valuesRows1 from Tweek', valuesRows1)

    const shift1 = Object.keys(valuesRows1)
    const shift2 = Object.keys(valuesRows2)
    const shift3 = Object.keys(valuesRows3)
    const grandTotal = '4'

    if (valuesRows2['2'].length === 0) {
      return (
        <div className='week-container'>
          <div className='headings-container'>
            <div>Start</div>
            <div>Break</div>
            <div>Finish</div>
            <div>Total</div>
          </div>
          <div className='values-block-container'>
            <ValuesRow lable='start'  specificRow={ valuesRows1['1'][0] } shift={ shift1 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
            <ValuesRow lable='break'  specificRow={ valuesRows1['1'][1] } shift={ shift1 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
            <ValuesRow lable='finish' specificRow={ valuesRows1['1'][2] } shift={ shift1 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
            <ValuesRow lable='total'  specificRow={ valuesRows1['1'][3] } shift={ shift1 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
          </div>
        </div>
      )
    }


    if (valuesRows2['2'].length > 0 && valuesRows3['3'].length === 0) {
      return (
        <React.Fragment>
          <div className='week-container'>
            <div className='headings-container'>
              <div>Start</div>
              <div>Break</div>
              <div>Finish</div>
              <div>Total</div>
            </div>
            <div className='values-block-container'>
              <ValuesRow lable='start'  specificRow={ valuesRows1['1'][0] } shift={ shift1 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
              <ValuesRow lable='break'  specificRow={ valuesRows1['1'][1] } shift={ shift1 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
              <ValuesRow lable='finish' specificRow={ valuesRows1['1'][2] } shift={ shift1 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
              <ValuesRow lable='total'  specificRow={ valuesRows1['1'][3] } shift={ shift1 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
            </div>
          </div>

          <div className='week-container'>
            <div className='headings-container'>
              <div>Start</div>
              <div>Break</div>
              <div>Finish</div>
              <div>Total</div>
            </div>
            <div className='values-block-container'>
              <ValuesRow lable='start'  specificRow={ valuesRows2['2'][0] } shift={ shift2 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
              <ValuesRow lable='break'  specificRow={ valuesRows2['2'][1] } shift={ shift2 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
              <ValuesRow lable='finish' specificRow={ valuesRows2['2'][2] } shift={ shift2 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
              <ValuesRow lable='total'  specificRow={ valuesRows2['2'][3] } shift={ shift2 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
            </div>
          </div>

          <div className="grand-totals-container">
            <div className='grand-totals-heading-container'>
              <div>Grand Total</div>
            </div>
            <div className='grand-totals-row-container'>
              <div className='grand-totals-row'>
                <ValuesRow lable='grandTotal'  specificRow={ grandTotalsRow } shift={ grandTotal } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    }
    if (valuesRows3['3'].length > 0) {
      return (
        <React.Fragment>
          <div className='week-container'>
            <div className='headings-container'>
              <div>Start</div>
              <div>Break</div>
              <div>Finish</div>
              <div>Total</div>
            </div>
            <div className='values-block-container'>
              <ValuesRow lable='start'  specificRow={ valuesRows1['1'][0] } shift={ shift1 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
              <ValuesRow lable='break'  specificRow={ valuesRows1['1'][1] } shift={ shift1 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
              <ValuesRow lable='finish' specificRow={ valuesRows1['1'][2] } shift={ shift1 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
              <ValuesRow lable='total'  specificRow={ valuesRows1['1'][3] } shift={ shift1 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
            </div>
          </div>

          <div className="week-container">
            <div className='headings-container'>
              <div>Start</div>
              <div>Break</div>
              <div>Finish</div>
              <div>Total</div>
            </div>
            <div className='values-block-container'>
              <ValuesRow lable='start'  specificRow={ valuesRows2['2'][0] } shift={ shift2 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
              <ValuesRow lable='break'  specificRow={ valuesRows2['2'][1] } shift={ shift2 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
              <ValuesRow lable='finish' specificRow={ valuesRows2['2'][2] } shift={ shift2 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
              <ValuesRow lable='total'  specificRow={ valuesRows2['2'][3] } shift={ shift2 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
            </div>
          </div>

          <div className="week-container">
            <div className='headings-container'>
              <div>Start</div>
              <div>Break</div>
              <div>Finish</div>
              <div>Total</div>
            </div>
            <div className='values-block-container'>
              <ValuesRow lable='start'  specificRow={ valuesRows3['3'][0] } shift={ shift3 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
              <ValuesRow lable='break'  specificRow={ valuesRows3['3'][1] } shift={ shift3 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
              <ValuesRow lable='finish' specificRow={ valuesRows3['3'][2] } shift={ shift3 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
              <ValuesRow lable='total'  specificRow={ valuesRows3['3'][3] } shift={ shift3 } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
            </div>
          </div>

          <div className="grand-totals-container">
            <div className='grand-totals-heading-container'>
              <div>Grand Total</div>
            </div>
            <div className='grand-totals-row-container'>
              <div className='grand-totals-row'>
                <ValuesRow lable='grandTotal'  specificRow={ grandTotalsRow } shift={ grandTotal } weekDates={ weekDates } weekID={ weekID } individual={ individual } />
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    }

  }

}

export default TWeek
