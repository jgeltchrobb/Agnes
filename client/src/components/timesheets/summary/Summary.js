import React, { Component } from 'react'
import Name from '../Name'
import TotalsRow from '../TotalsRow'

class Summary extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount = () => {
    const { staffNames, timesheetData } = this.props

    console.log(timesheetData)

  // Flags:
  // - if they clock in late OR don't clock in
  //   ( if don't clock how do we deal? - if late -> actual,
  //      if none default to 1 min before clockout )
  // -
    const totalsRows = []
    const payCategories = ['Ordinary','Sat','Sun','Night']
    // PayCategories will be automatically added to the column headings
    // They will also be added as keys to the totalsRow:
    // - corresponding hours will be added to each one based on the conditional:
    //   ( If earlier than 8pm, give a two hour buffer set as 20 in
    // var DayShiftDefinitionClockinBeforeHours )
    const entitlements = ['Annual Leave','Sick Leave','Long Service Leave','Sleep-over Bonus']
    // Entitlements will separately entered into a FORM and then show up as columns
    // after any public holiday / Wayne hours
    //
    // Have a check box (Default false) in the roster shift modle for:
    // - PUBLIC HOLIDAYS
    // - WAYNE SHIFT
    // IF CHECKED THEY WILL BE added to the column headings and apear in a column below it

    var DayShiftDefinitionClockinBeforeHours = 20
    const milliToHours = 0.00000027777777777778

    timesheetData.map((staffMember) => {
      const totalsRow = {}
      totalsRow.staffID = staffMember.staffID
      payCategories.map((cat) => {
        totalsRow[cat] = null
      })
      staffMember.shifts.map((shift) => {
        // if (!totalsRow[shift.category]) {
          // totalsRow[shift.category] = (((shift.finish - shift.start)*0.00000027777777777778).toFixed(2))
        // } else {
          // totalsRow[shift.category] += (((shift.finish - shift.start)*0.00000027777777777778).toFixed(2))
        // }
        // Filter hours into categories:

        if (shift.start.getHours() < DayShiftDefinitionClockinBeforeHours) {
          //   - if (shift.start.getHours() < 20) {
          //      if (sat) {
          //        add to sat
          //      } else if (Sun) {
          //        add to Sun
          //      } else {
          //        add to Ordinary
          //      }
          //    } else { add to Night }
          if (
            shift.start.getDay() === 6
          ) {
            totalsRow['Sat']      += (Number(((shift.finish - shift.start) * milliToHours).toFixed(2)))
          } else if (
            shift.start.getDay() === 0) {
            totalsRow['Sun']      += (Number(((shift.finish - shift.start) * milliToHours).toFixed(2)))
          } else {
            totalsRow['Ordinary'] += (Number(((shift.finish - shift.start) * milliToHours).toFixed(2)))
          }

        } else {
          totalsRow['Night'] += (Number(((shift.finish - shift.start) * milliToHours).toFixed(2)))
        }
      })
      totalsRows.push(totalsRow)
    })

    this.setState({
      totalsRows: totalsRows,
    })

  }

  nameToTop = () => {
    {/* Take name/id array and sort clicked name to front */}
  }

  render() {
    const { staffNames, setIndividual } = this.props

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
{/*
        <div>
          totalsRows.map((row) => {
            <TotalsRow />
          })
        </div>
*/}

      </div>
    )
  }

}

export default Summary
