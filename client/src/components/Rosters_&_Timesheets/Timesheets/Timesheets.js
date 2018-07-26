import React, { Component } from 'react'
import { api, setJwt } from '../../../api/init'
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
      // columnHeadings: Array of strings - All applicable payRateCategories for the week so far (for which at least one rostered shift exists), followed all entitlements in the database (Entitlements model (Array of strings))
      // e.g. [ 'Ordinary', 'Sat', 'Night', 'Annual Leave', 'Sick Leave',...]
      columnHeadings: [],
      // totalsRows: Array containing an obj for each staff member with at least one rostered shift
      // e.g. [ {Ordinary: 28, Sat: 6.5,... staffID: 'u76taefd67eas'}, {Ordinary: 32, Night: 8,... staffID: 'dsf76SDf576f'} ]
      totalsRows: [],
      // individual: The staffID of the name selected for indiviual timesheets view
      // 'u76taefd67eas'
      individual: '',
      // individualTotalsRow: The obj in totalsRows array that corresponds to the individual selected (the staffID in this.state.indiviual)
      // e.g. {Ordinary: 28, Sat: 6.5,... staffID: 'u76taefd67eas'}
      individualTotalsRow: [],
    }
  }

  componentDidMount = async () => {
    await this.setTimesheets()
    if (this.props.staffUser) {
      this.setIndividual(this.props.staffUser._id)
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.week !== prevProps.week) {
      await this.setTimesheets()
      if (this.props.staffUser) {
        this.setIndividual(this.props.staffUser._id)
      }
      if (this.state.individual) {
        this.setIndividual(this.state.individual)

      }
    }

  }

  setTimesheets = () => {
    console.log('setTimesheets...running')
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
        const rStart = new Date(shift.start.rostered)
        const aStart = shift.start.actual ? new Date(shift.start.actual) : ''
        var start = ''
        const rFinish = new Date(shift.finish.rostered)
        const aFinish = shift.finish.actual ? new Date(shift.finish.actual) : ''
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

        // calculate timnesheet start and post. Will also post flag if required
        if (!shift.start.timesheet || shift.start.flag === false) {
          start = this.timesheetEntry('start', rStart, aStart, staffID, shift.date, shiftNumber, shift._id)
          this.postTimesheetTime(staffID, shift.date, shiftNumber, 'start', start, shift._id)
console.log('calculated start...', start)
        } else { start = new Date(shift.start.timesheet)
console.log('existing start...', start)
        }
        // calculate timnesheet finish and post. Will also post flag if required
        if (!shift.start.timesheet || shift.start.flag === false) {
          finish = this.timesheetEntry('finish', rFinish, aFinish, staffID, shift.date, shiftNumber, shift._id)
          this.postTimesheetTime(staffID, shift.date, shiftNumber, 'finish', finish, shift._id)
console.log('calculated finish...', finish)
        } else { finish = new Date(shift.finish.timesheet)
console.log('existing finish...', finish)
        }
        // shift hours are just finish - start times converted to a number of hours with two decimal places
        const startFinishDifference = (Number(((finish - start) * milliToHours).toFixed(2)))
        // take off break time (15 or 30 mins)
        const shiftHours = (startFinishDifference < 4) ? (startFinishDifference - 0.25) : (startFinishDifference - 0.5)
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
          return rostered
        }
        if (startOrFinish === 'finish') {
          this.postFlag(shiftID, startOrFinish, staffID, shiftDate, rostered, actual)
          return this.roundDown(actual)
        }
      } else {

        if (startOrFinish === 'start') {
          this.postFlag(shiftID, startOrFinish, staffID, shiftDate, rostered, actual)
          return this.roundUp(actual)
        }
        if (startOrFinish === 'finish') {
          return rostered
        }
      }
      // If no clock time then return rostered
    } else {
      return rostered
    }
  }

  postTimesheetTime = (staffID, shiftDate, shiftNumber, startOrFinish, time, shiftID) => {
    console.log('postTimesheetTime...', )
    let timeObj =   {
                      weekID: this.state.weekID,
                      staffID: staffID,
                      date: shiftDate,
                      shiftNumber: shiftNumber,
                      startOrFinish: startOrFinish,
                      shiftID: shiftID,
                      time: time,
                    }

    api.post('timesheets/timesheet-time/update', {timeObj}).then((response) => {
      console.log(response)
    })
  }

  postFlag = (shiftID, startOrFinish, staffID, shiftDate, rostered, actual) => {
    console.log('postFlag...', )

    let flagObj =  {
                      weekID: this.state.weekID,
                      staffID: staffID,
                      shiftID: shiftID,
                      startOrFinish: startOrFinish,
                      date: shiftDate,
                      rostered: rostered,
                      actual: actual,
                      active: true,
                    }
                    console.log(flagObj)

    api.put('flags/new', {flagObj}).then((response) => {
    })
  }

  removeDuplicates = (arr) => {
    let unique_array = Array.from(new Set(arr))
    return unique_array
  }

  removeIndividual = () => {
    this.setState({ individual: '' })
  }

  setIndividual = (userID) => {
    var staffID = userID
    if (this.props.staffUser) {staffID = this.props.staffUser._id}
    this.setState({ individual: staffID })
    this.setIndividualTotalsRow(staffID)
  }

  setIndividualTotalsRow = (staffID) => {
    this.state.totalsRows.map((row) => {
      if (row.staffID === staffID) {
        this.setState({ individualTotalsRow: row })
      }
    })
  }


  render() {
    const { staffUser, role, week, prevWeek, users, goToNextWeek, goToPreviousWeek, sideBarHeading } = this.props
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
                          staffUser={ staffUser }
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
