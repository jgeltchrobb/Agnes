import React, { Component } from 'react'
import Header from '../../HeaderBar/Header'
import DisplayCategory from '../Common/DisplayCategory'
import TotalsRow from '../Common/TotalsRow'
import Summary from '../Summary/Summary'
import Individual from '../Individual/Individual'

class Timesheets extends Component {
  constructor(props) {
    super(props)

    // this.week               = this.props
    // this.users              = this.props
    // this.payRateCategories  = this.props
    // this.entitlements       = this.props

    this.state = {
      individual: '',

    }
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
        }
      } else {

        if (startOrFinish === 'start') {
          return this.roundUp(actual)
        }
        if (startOrFinish === 'finish') {
          return rostered
        }
      }
      // If no clock time then return rostered
    } else return rostered
  }

  componentDidMount = () => {


    const payRateCategoriesObj = {}

    this.props.payRateCategories.map((cat) => {
      payRateCategoriesObj[cat] = 0
    })


    // const payRateCategories1 = {
    //                             ['Ordinary']:               0,
    //                             ['Sat']:                    0,
    //                             ['Sun']:                    0,
    //                             ['Night']:                  0,
    //                             ['Public Holiday']:         0,
    //                             ['Wayne Ordinary']:         0,
    //                             ['Wayne Sat']:              0,
    //                             ['Wayne Sun']:              0,
    //                             ['Wayne Night']:            0,
    //                             ['Wayne Public Holiday']:   0
    //                           }

    const entitlements = ['Annual Leave', 'Sick Leave', 'Long Service Leave', 'Sleep-over Bonus']


    var DayShiftDefinitionClockinBeforeHours = 20
    const milliToHours = 0.00000027777777777778

    // Posting to the data:
     // start.timesheet, finish.timesheet, flags set to true as required
     // Flags:
     // - if they clock in late or note at all
     // - if don't clock in before end of shift (shift.finish.rostered) then set
     //    shift.start.timesheet to 1 min before rostered  finish time
    const totalsRows = []
    this.props.week.staff.map((staffMember) => {

      const totalsRow = {}
      this.props.payRateCategories.map((cat) => {
        totalsRow[cat] = 0
      })
      this.props.entitlements.map((cat) => {
        totalsRow[cat] = 0
      })
      totalsRow.staffID = staffMember.staffID

      staffMember.shifts.map((shift) => {
        const rStart = new Date(shift.start.rostered)
        const aStart = new Date(shift.start.actual)
        var start = ''
        const rFinish = new Date(shift.finish.rostered)
        const aFinish = new Date(shift.finish.actual)
        var finish = ''
        if (!shift.start.timesheet) {
          var start = this.timesheetEntry('start', rStart, aStart)
          // do below except don't post, rather update state and then update db from state behind the scenes
          // if (start > shift.start.rostered) {
          //   setState: shift.start.flag = true
          // }
          // setState: start.timesheet = start
        }

        if (!shift.finish.timesheet) {
          var finish = this.timesheetEntry('finish', rFinish, aFinish)
          // do below except don't post, rather update state and then update db from state behind the scenes
          // if (start > shift.finish.rostered) {
          //   setState: shift.finish.flag = true
          // }
          // setState: finish.timesheet = finish
        }

        const shiftHours = (Number(((finish - start) * milliToHours).toFixed(2)))

        if (!shift.publicHoliday) {

          if (start.getHours() < DayShiftDefinitionClockinBeforeHours) {

            if (start.getDay() === 6) {
              if (shift.wayneShift) {
                totalsRow['Wayne Sat'] += shiftHours
              } else {
                totalsRow['Sat'] += shiftHours
              }
            } else if (start.getDay() === 0) {
                if (shift.wayneShift) {
                  totalsRow['Wayne Sun'] += shiftHours
                } else {
                  totalsRow['Sun'] += shiftHours
                }
            } else {
                if (shift.wayneShift) {
                  totalsRow['Wayne Ordinary'] += shiftHours
                } else {
                  totalsRow['Ordinary'] += shiftHours
                }
            }

          } else {
              if (shift.wayneShift) {
                totalsRow['Wayne Night'] += shiftHours
              } else {
                totalsRow['Night'] += shiftHours
              }
          }
        } else if (shift.publicHoliday && shift.wayneShift) {
          totalsRow['Wayne Public Holiday'] += shiftHours

        } else {
          totalsRow['Public Holiday'] += shiftHours
        }
      })

  // Count times the payRateCategories apear in the totalsRows
      for (let category in payRateCategoriesObj) {
        for (let cat in totalsRow) {
          if (cat === category) { payRateCategoriesObj[category] += 1}
        }
      }
      totalsRows.push(totalsRow)
    })

  // If count is zero then there is no need to displayu that catergory so delete it
    for (let category in payRateCategoriesObj) {
      if (payRateCategoriesObj[category] === 0) {

        delete payRateCategoriesObj[category]
      }
    }
    const payRateCategoriesColumnHeadings = Object.keys(payRateCategoriesObj)

    const displayCategories = [...payRateCategoriesColumnHeadings, ...this.props.entitlements]

    this.setState({
      totalsRows:  totalsRows,
      displayCategories:  displayCategories
    })

  }


  setIndividual = (staffID) => {
    this.setState({ individual: staffID })
  }

  removeIndividual = () => {
    this.setState({ individual: '' })
  }

  render() {
    if (!this.state.displayCategories && !this.state.totalsRows) return ''
    const { week, users, nextWeek, previousWeek, sideBarHeading } = this.props

    return (
      <div>

        <div>
          <Header weekDate={week.date}
                  nextWeek={nextWeek}
                  previousWeek={previousWeek}
                  sideBarHeading={sideBarHeading}
          />
        </div>

        <div>
          {
            this.state.displayCategories.map((displayCategory) => {
              return (
                <DisplayCategory columnHeading={displayCategory} />
              )
            })
          }
        </div>

        { !this.state.individual ? (
            <div>
              <Summary  totalsRows={this.state.totalsRows}
                        users={users}
                        displayCategories={this.state.displayCategories}
                        entitlements={this.props.entitlements}
                        setIndividual={this.setIndividual}
              />
            </div>
          )
          :
          (
              <div>
                <Individual individual={this.state.individual}
                            totalsRows={this.state.totalsRows}
                            users={users}
                            displayCategories={this.state.displayCategories}
                            entitlements={this.props.entitlements}
                            setIndividual={this.setIndividual}
                            removeIndividual={this.removeIndividual}
                />
            </div>
          )
        }
      </div>
    )

  }

}

export default Timesheets
