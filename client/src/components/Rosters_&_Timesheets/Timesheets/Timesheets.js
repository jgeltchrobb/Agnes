import React, { Component } from 'react'
import Header from '../HeaderBar/Header'
import ColumnHeading from './Common/ColumnHeading'
import Name from './Common/Name'
import TotalsRow from './Common/TotalsRow'
import Individual from './Individual/Individual'

class Timesheets extends Component {
  state = {
    columnHeadings: [],
    totalsRows: [],
    staffIdArray: '',
    individual: '',
    individualTotalsRow: [],
  }

  componentDidMount = () => {
    this.setTotalsRowsAndColumnHeadings()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.week !== prevProps.week) {
      this.setTotalsRowsAndColumnHeadings()
    }
  }

  setTotalsRowsAndColumnHeadings = () => {
    // Posting to the data:
     // start.timesheet, finish.timesheet, flags set to true as required
     // Flags:
     // - if they clock in late or note at all
     // - if don't clock in before end of shift (shift.finish.rostered) then set
     //    shift.start.timesheet to 1 min before rostered  finish time
     var DayShiftDefinitionClockinBeforeHours = 20
     const milliToHours = 0.00000027777777777778

    const staffIdArray = []
    var columnHeadings = []
    const totalsRows = []
    this.props.week.staff.map((staffMember) => {

      staffIdArray.push(staffMember.staffID)
      const totalsRow = {}
      staffMember.shifts.map((shift) => {

        const rStart = new Date(shift.start.rostered)
        const aStart = new Date(shift.start.actual)
        var start = ''
        const rFinish = new Date(shift.finish.rostered)
        const aFinish = new Date(shift.finish.actual)
        var finish = ''
        // set timnesheet start value. If not in data then calculate it
        shift.start.timesheet ? start = new Date(shift.start.timesheet) : start = this.timesheetEntry('start', rStart, aStart)
        // if not in data need to async post to db without updating App state or this will rerender and don't need because we now have the info required to go forward from here
        // will have to decide how often App does a api request to update data
        // also need to post flags, which are uncovered in the timesheetEntry method
        // Same goes for finish time
        // set timnesheet finsih value. If not in data then calculate it
        shift.finish.timesheet ? finish = new Date(shift.finish.timesheet) : finish = this.timesheetEntry('finish', rFinish, aFinish)
        // shift hours are just finish - start times converted to a number of hours with two decimal places
        const shiftHours = (Number(((finish - start) * milliToHours).toFixed(2)))
        // determine the shift's payRateCategory and add it to totalsRow with the shiftHours as the value
        if (!shift.publicHoliday) {

          if (start.getHours() < DayShiftDefinitionClockinBeforeHours) {

            if (start.getDay() === 6) {
              if (shift.wayneShift) {
                totalsRow['Wayne Sat'] ? totalsRow['Wayne Sat'] += shiftHours : totalsRow['Wayne Sat'] = shiftHours
              } else {
                totalsRow['Sat'] ? totalsRow['Sat'] += shiftHours : totalsRow['Sat'] = shiftHours
              }
            } else if (start.getDay() === 0) {
                if (shift.wayneShift) {
                  totalsRow['Wayne Sun'] ? totalsRow['Wayne Sun'] += shiftHours : totalsRow['Wayne Sun'] = shiftHours
                } else {
                  totalsRow['Sun'] ? totalsRow['Sun'] += shiftHours : totalsRow['Sun'] = shiftHours
                }
            } else {
                if (shift.wayneShift) {
                  totalsRow['Wayne Ordinary'] ? totalsRow['Wayne Ordinary'] += shiftHours : totalsRow['Wayne Ordinary'] = shiftHours
                } else {
                  totalsRow['Ordinary'] ? totalsRow['Ordinary'] += shiftHours : totalsRow['Ordinary'] = shiftHours
                }
            }
          } else {
              if (shift.wayneShift) {
                totalsRow['Wayne Night'] ? totalsRow['Wayne Night'] += shiftHours : totalsRow['Wayne Night'] = shiftHours
              } else {
                totalsRow['Night'] ? totalsRow['Night'] += shiftHours : totalsRow['Night'] = shiftHours
              }
          }
        } else if (shift.publicHoliday && shift.wayneShift) {
          totalsRow['Wayne Public Holiday'] ? totalsRow['Wayne Public Holiday'] += shiftHours : totalsRow['Wayne Public Holiday'] = shiftHours

        } else {
          totalsRow['Public Holiday'] ? totalsRow['Public Holiday'] += shiftHours : totalsRow['Public Holiday'] = shiftHours
        }
      })
      // push totalsRow key to columnHeadings array
      for (let cat in totalsRow) {
        columnHeadings.push(cat)
      }
      // add staffID to totalsRow
      totalsRow.staffID = staffMember.staffID
      // push totalsRow object to totalsRows array
      totalsRows.push(totalsRow)
    })
    // // Remove duplicates from columnHeadings array and merge with entitlements array to form final column heads array
    columnHeadings = [...this.removeDuplicates(columnHeadings), ...this.props.entitlements]

    this.setState({
      columnHeadings: columnHeadings,
      totalsRows:  totalsRows,
      staffIdArray: staffIdArray,
    })
  }

  roundUp = (time) => {
    var mins = time.getMinutes()

    if (mins > 45) {
      mins = 60
    } else if (45 >= mins && mins > 30) {
      mins = 45
    } else if (30 >= mins && mins > 15) {
      mins = 30
    } else if (15 >= mins && mins > 0) {
      mins = 15
    } else {
      mins = 0
    }
    time.setMinutes(mins)
    return time
  }

  roundDown = (time) => {
    var mins = time.getMinutes()

    if (mins >= 45) {
      mins = 45
    } else if (45 > mins && mins >= 30) {
      mins = 30
    } else if (30 > mins && mins >= 15) {
      mins = 15
    } else if (15 > mins) {
      mins = 0
    }
    time.setMinutes(mins)
    return time
  }

  timesheetEntry = (startOrFinish, rostered, actual) => {
    if (actual) {

      if (actual <= rostered) {
        if (startOrFinish === 'start') {
          return rostered
        }
        if (startOrFinish === 'finish') {
          return this.roundDown(actual)
          // and post flag!!!
        }
      } else {

        if (startOrFinish === 'start') {
          return this.roundUp(actual)
          // and post flag!!!
        }
        if (startOrFinish === 'finish') {
          return rostered
        }
      }
      // If no clock time then return rostered
    } else return rostered
  }

  removeDuplicates = (arr) => {
    let unique_array = Array.from(new Set(arr))
    return unique_array
  }

  setIndividual = (staffID) => {
    this.setState({ individual: staffID })
    this.state.totalsRows.map((row) => {
      if (row.staffID === staffID) {
        this.setState({ individualTotalsRow: row, })
      }
    })
    // If we decide to change the order of the names...
          // let newArray = this.state.staffIdArray
          // newArray.splice(newArray.indexOf(staffID), 1)
          // newArray.unshift(staffID)
          // this.setState({ staffIdArray: newArray })
  }

  removeIndividual = () => {
    this.setState({ individual: '' })
  }


  render() {
    const { week, prevWeek, users, nextWeek, previousWeek, sideBarHeading } = this.props

    const shiftBreakLength = 30

    if (!this.state.individual) {

      return (
        <div>

          <div>
            <Header weekDate={week.date}
                    nextWeek={nextWeek}
                    previousWeek={previousWeek}
                    sideBarHeading={sideBarHeading}
            />
          </div>

          <div className='columnHeadings-constainer'>
            {
              this.state.columnHeadings.map((columnHeading) => {
                return (
                  <ColumnHeading columnHeading={columnHeading} />
                )
              })
            }
          </div>

          <div className='names-constainer'>
            {
              this.state.totalsRows.map((row) => {
              return (
                <Name staffID={row.staffID}
                      users={users}
                      setIndividual={this.setIndividual}
                      removeIndividual={this.removeIndividual}
                />
                )
              })
            }
          </div>

          <div>
            {
              this.state.totalsRows.map((row) => {
                return (
                  <TotalsRow  row={row}
                              columnHeadings={this.state.columnHeadings}
                              setIndividual={this.setIndividual}
                  />
                )
              })
            }
          </div>

        </div>
      )
    } else {
      if (!this.state.individualTotalsRow) { return '' }
      return (
        <div>

          <div className='headerBar'>
            <Header weekDate={week.date}
                    nextWeek={nextWeek}
                    previousWeek={previousWeek}
                    sideBarHeading={sideBarHeading}
            />
          </div>

          <div className='columnHeadings-constainer'>
            {
              this.state.columnHeadings.map((columnHeading) => {
                return (
                  <ColumnHeading columnHeading={columnHeading} />
                )
              })
            }
          </div>

          <div className='names-constainer'>
            {
              this.state.staffIdArray.map((id) => {
              return (
                <Name staffID={id}
                      users={users}
                      individual={this.state.individual}
                      setIndividual={this.setIndividual}
                      removeIndividual={this.removeIndividual}
                />
                )
              })
            }
          </div>

          <div className='totalsRow'>
                  <TotalsRow  row={this.state.individualTotalsRow}
                              columnHeadings={this.state.columnHeadings}
                              setIndividual={this.setIndividual}
                  />
          </div>

          <div>
            <Individual week={week}
                        prevWeek={prevWeek}
                        individual={this.state.individual}
                        shiftBreakLength={shiftBreakLength}
                        individualTotalsRow={this.state.individualTotalsRow}
                        setIndividual={this.setIndividual}
                        removeIndividual={this.removeIndividual}
            />
          </div>

        </div>
      )
    }
  }

}

export default Timesheets
