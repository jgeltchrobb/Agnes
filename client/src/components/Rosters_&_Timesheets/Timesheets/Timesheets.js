import React, { Component } from 'react'
import axios from 'axios'
import Header from '../HeaderBar/Header'
import ColumnHeading from './Common/ColumnHeading'
import Name from './Common/Name'
import TotalsRow from './Common/TotalsRow'
import Individual from './Individual/Individual'
import  '../../../stylesheets/Timesheets.css'


class Timesheets extends Component {
  constructor(props) {
    super(props)

    this.state = {
      weekID: this.props.week._id,
      columnHeadings: [],
      totalsRows: [],
      individual: '',
      individualTotalsRow: [],
    }
  }

  componentDidMount = () => {
    this.setTotalsRowsAndColumnHeadings()
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.week !== prevProps.week) {
      await this.setTotalsRowsAndColumnHeadings()
      this.setIndividual(this.state.individual)
    }
  }

  setTotalsRowsAndColumnHeadings = () => {
    // Posting to db:
     // start.timesheet, finish.timesheet, flags set to true as required
     // Flags:
     // - if they clock in late or note at all
     // - if don't clock in before end of shift (shift.finish.rostered) then set
     //    shift.start.timesheet to 1 min before rostered  finish time
     var DayShiftDefinitionClockinBeforeHours = 20
     const milliToHours = 0.00000027777777777778

    var columnHeadings = []
    const totalsRows = []

    this.props.week.staff.map((staffMember) => {

      var staffID = staffMember.staffID
      const totalsRow = {}
      var prevShiftDate = ''
      var prevPrevShiftDate = ''

      staffMember.shifts.map((shift) => {
        console.log(shift, 'IIIIIIIIIIIIIIIIIIII')
        const rStart = new Date(shift.start.rostered)
        const aStart = new Date(shift.start.actual)
        var start = ''
        const rFinish = new Date(shift.finish.rostered)
        const aFinish = new Date(shift.finish.actual)
        var finish = ''

        var shiftNumber = 1

        if (shift.date === prevShiftDate && shift.date !== prevPrevShiftDate) {
          shiftNumber = 2
        }
        if (shift.date === prevPrevShiftDate) {
          shiftNumber = 3
        }
        prevPrevShiftDate = prevShiftDate
        prevShiftDate = shift.date

        // set timnesheet start value. If not in db then calculate it
        shift.start.timesheet ? start = new Date(shift.start.timesheet) : start = this.timesheetEntry('start', rStart, aStart, staffID, shift.date, shiftNumber, shift._id)
        // set timnesheet finsih value. If not in data then calculate it
        shift.finish.timesheet ? finish = new Date(shift.finish.timesheet) : finish = this.timesheetEntry('finish', rFinish, aFinish, staffID, shift.date, shiftNumber, shift._id)
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
    })
    // console.log(totalsRows)
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

  timesheetEntry = (startOrFinish, rostered, actual, staffID, shiftDate, shiftNumber, shiftID) => {
    if (actual) {

      if (actual <= rostered) {
        if (startOrFinish === 'start') {
          this.postTimesheetTime(staffID, shiftDate, shiftNumber, startOrFinish, rostered, shiftID)
          return rostered
        }
        if (startOrFinish === 'finish') {
          this.postTimesheetTime(staffID, shiftDate, shiftNumber, startOrFinish, this.roundDown(actual), shiftID)
          this.postFlag(staffID, shiftDate, rostered, actual)
          return this.roundDown(actual)
        }
      } else {

        if (startOrFinish === 'start') {
          this.postTimesheetTime(staffID, shiftDate, shiftNumber, startOrFinish, this.roundUp(actual), shiftID)
          this.postFlag(staffID, shiftDate, rostered, actual)
          return this.roundUp(actual)
        }
        if (startOrFinish === 'finish') {
          this.postTimesheetTime(staffID, shiftDate, shiftNumber, startOrFinish, rostered, shiftID)
          return rostered
        }
      }
      // If no clock time then return rostered
    } else {
      this.postTimesheetTime(staffID, shiftDate, shiftNumber, startOrFinish, rostered, shiftID)
      return rostered
    }
  }

  postTimesheetTime = (staffID, shiftDate, shiftNumber, startOrFinish, value, shiftID) => {
    const server = 'http://localhost:4000'
    console.log(shiftID, 'ASSAAAASS')
    let timeObj =   {
                      weekID: this.state.weekID,
                      staffID: staffID,
                      date: shiftDate,
                      shiftNumber: shiftNumber,
                      startOrFinish: startOrFinish,
                      shiftID: shiftID,
                      value: value,
                    }

    // axios.post(server + '/timesheets/timesheet-time/update', {timeObj}).then((response) => {
    //   console.log(response)
    // })
  }

  postFlag = (staffID, shiftDate, rostered, actual) => {
    const server = 'http://localhost:4000'

    let flagObj =  {
                      staffID: staffID,
                      date: shiftDate,
                      rostered: rostered,
                      actual: actual,
                      active: true,
                    }
                    console.log(flagObj, 'rRRRRrrrrrrrrrrrrrrrrS')

    axios.put(server + '/flags/new', {flagObj}).then((response) => {
      // console.log(response.data.confirmation)
    })
  }

  removeDuplicates = (arr) => {
    let unique_array = Array.from(new Set(arr))
    return unique_array
  }

  setIndividual = (staffID) => {
    this.setState({ individual: staffID })
    this.state.totalsRows.map((row) => {
      if (row.staffID === staffID) {
        this.setState({ individualTotalsRow: row })
      }
    })
  }

  removeIndividual = () => {
    this.setState({ individual: '' })
  }


  render() {
    const { week, prevWeek, users, goToNextWeek, goToPreviousWeek, sideBarHeading } = this.props

    console.log(this.state.individualTotalsRow)
    console.log(this.state.totalsRows)


    if (!this.state.individual) {

      return (
        <div className="timesheets-container">

          <div className="timesheets">
            <Header weekDate={ week.date }
                    goToNextWeek={ goToNextWeek }
                    goToPreviousWeek={ goToPreviousWeek }
                    sideBarHeading={ sideBarHeading }
            />
          </div>

          <div className="column-headings-container">
            <div className="empty-column"></div>
            <div className="headings-column">
              {
                this.state.columnHeadings.map((columnHeading, index) => {
                  return (
                    <ColumnHeading key={ index } columnHeading={ columnHeading } />
                  )
                })
              }
            </div>
          </div>

          <div className="main-timesheet-container">
            <div className='names-container'>
              {
                this.state.totalsRows.map((row) => {
                return (
                  <Name key={ row.staffID }
                        staffID={ row.staffID }
                        users={ users }
                        individual={ this.state.individual }
                        setIndividual={ this.setIndividual }
                        removeIndividual={ this.removeIndividual }
                  />
                  )
                })
              }
            </div>
            <div className="timesheet-container">
              {
                this.state.totalsRows.map((row) => {
                  return (
                    <TotalsRow  key={ row.staffID }
                                row={ row }
                                columnHeadings={ this.state.columnHeadings }
                                setIndividual={ this.setIndividual }
                    />
                  )
                })
              }
            </div>
          </div>

        </div>
      )
    } else {
      if (!this.state.individualTotalsRow) { return '' }
      return (
        <div className="timesheets-container">

          <div className='timesheets'>
            <Header weekDate={ week.date }
                    goToNextWeek={ goToNextWeek }
                    goToPreviousWeek={ goToPreviousWeek }
                    sideBarHeading={ sideBarHeading }
            />
          </div>

          <div className='column-headings-container'>
            <div className="empty-column"></div>
            <div className="headings-column">
              {
                this.state.columnHeadings.map((columnHeading, index) => {
                  return (
                    <ColumnHeading key={ index } columnHeading={ columnHeading } />
                  )
                })
              }
            </div>
          </div>

          <div className="main-timesheet-container">
            <div className='names-container'>
              {
                this.state.totalsRows.map((row) => {
                  return (
                    <Name key={ row.staffID }
                          staffID={ row.staffID }
                          users={ users }
                          individual={ this.state.individual }
                          setIndividual={ this.setIndividual }
                          removeIndividual={ this.removeIndividual }
                    />
                  )
                })
              }
            </div>

            <div className="individual-view-container">
              <div className='timesheet-container'>
                      <TotalsRow  row={ this.state.individualTotalsRow }
                                  columnHeadings={ this.state.columnHeadings }
                                  setIndividual={ this.setIndividual }
                      />
              </div>
              <div className="individual-container">
                <Individual week={ week }
                            prevWeek={ prevWeek }
                            individual={ this.state.individual }
                            individualTotalsRow={ this.state.individualTotalsRow }
                            setIndividual={ this.setIndividual }
                            removeIndividual={ this.removeIndividual }
                />
              </div>
            </div>
          </div>

        </div>
      )
    }
  }

}

export default Timesheets
