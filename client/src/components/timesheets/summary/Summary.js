import React, { Component } from 'react'
import Name from '../Name'
import TotalsRow from '../TotalsRow'

class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // fullTotalsRows: []
    }

  }

  componentDidMount = () => {
    const { staffNames, timesheetData } = this.props

  // Flags:
  // - if they clock in late OR don't clock in
  //   ( if don't clock how do we deal? - if late -> actual,
  //      if none default to 1 min before clockout )
  // -
    const payRateCategoriesTotalsRows = []
    const payRateCategories = [
      'Ordinary', 'Sat', 'Sun', 'Night', 'Public Holiday',
      'Wayne Ordinary', 'Wayne Sat', 'Wayne Sun', 'Wayne Night', 'Wayne Public Holiday',
    ]
    const entitlements = ['Annual Leave', 'Sick Leave', 'Long Service Leave', 'Sleep-over Bonus']

    // Have a check box (Default false) in the roster shift modle for:
    // - PUBLIC HOLIDAYS
    // - WAYNE SHIFT
    // They must be added to the schema as booleans for each shift - default false

    var DayShiftDefinitionClockinBeforeHours = 20
    const milliToHours = 0.00000027777777777778

    timesheetData.map((staffMember) => {
      const totalsRow = {}
      totalsRow.staffID = staffMember.staffID
      payRateCategories.map((cat) => {
        payRateCategoriesTotalsRows[cat] = null
      })
      staffMember.shifts.map((shift) => {
        // if (!totalsRow[shift.category]) {
          // totalsRow[shift.category] = (((shift.finish - shift.start)*0.00000027777777777778).toFixed(2))
        // } else {
          // totalsRow[shift.category] += (((shift.finish - shift.start)*0.00000027777777777778).toFixed(2))
        // }
        // Filter hours into categories:

        //   - if (shift.start.getHours() < 20) {
        //      if (sat) {
        //        add to sat
        //      } else if (Sun) {
        //        add to Sun
        //      } else {
        //        add to Ordinary
        //      }
        //    } else { add to Night }
        const shiftHours = (Number(((shift.finish - shift.start) * milliToHours).toFixed(2)))

        if (!shift.publicHoliday) {

          if (shift.start.getHours() < DayShiftDefinitionClockinBeforeHours) {

            if (shift.start.getDay() === 6) {
              if (shift.wayneShift) {
                totalsRow['Wayne Sat']          += shiftHours
              } else {
                totalsRow['Sat']                += shiftHours
              }
            } else if (shift.start.getDay() === 0) {
                if (shift.wayneShift) {
                  totalsRow['Wayne Sun']        += shiftHours
                } else {
                  totalsRow['Sun']              += shiftHours
                }
            } else {
                if (shift.wayneShift) {
                  totalsRow['Wayne Ordinary']   += shiftHours
                } else {
                  totalsRow['Ordinary']         += shiftHours
                }
            }

          } else {
              if (shift.wayneShift) {
                totalsRow['Wayne Night']        += shiftHours
              } else {
                totalsRow['Night']              += shiftHours
              }
          }

        } else if (shift.publicHoliday && shift.wayneShift) {
          totalsRow['Wayne Public Holiday']     += shiftHours

        } else {
          totalsRow['Public Holiday']           += shiftHours
        }

      })
      console.log(totalsRow)
      payRateCategoriesTotalsRows.push(totalsRow)
    })

    const finalTotalsRows = payRateCategoriesTotalsRows.map((row) => {
      for (let cat in row) {
        if (row[cat])
        console.log(row[cat])
      }
    })

    this.setState({
      finalTotalsRows: finalTotalsRows,
    })

  }

  nameToTop = () => {
    {/* Take name/id array and sort clicked name to front */}
  }

  render() {
    const { staffNames, setIndividual } = this.props

    if (!(this.state.finalTotalsRows)) return ''


    // console.log(this.state.fullTotalsRows)

    return (
      <div>

        <div className='names-constainer'>

{/*          staffNames.map((staffID) => {
            return (
              <Name staffID={staffID} />
            )
          })
*/}
        </div>

        <div>
          {
            this.state.finalTotalsRows.map((row) => {
            return (
              <TotalsRow row={row} />
            )
            })
          }
        </div>

      </div>
    )
  }

}

export default Summary
