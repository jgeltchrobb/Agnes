import React, { Component } from 'react'
import DisplayCategory from './DisplayCategory'
import Summary from './summary/Summary'
import Individual from './individual/Individual'

class Timesheets extends Component {
  constructor(props) {
    super(props)

    this.state = {
      individual: '',
      payRateCategories: [
                            {'Ordinary':               0},
                            {'Sat':                    0},
                            {'Sun':                    0},
                            {'Night':                  0},
                            {'Public Holiday':         0},
                            {'Wayne Ordinary':         0},
                            {'Wayne Sat':              0},
                            {'Wayne Sun':              0},
                            {'Wayne Night':            0},
                            {'Wayne Public Holiday':   0}
                          ]

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

    const displayCategories = this.state.payRateCategories

    // const displayCategories = Object.assign({}, payRateCategories)
    // const displayCategories = payRateCategories.slice()


    console.log(displayCategories)

    const entitlements = ['Annual Leave', 'Sick Leave', 'Long Service Leave', 'Sleep-over Bonus']

    const { week } = this.props

    var payRateCategoriesTotalsRows = []

    var DayShiftDefinitionClockinBeforeHours = 20
    const milliToHours = 0.00000027777777777778

    // Posting to the data:
     // start.timesheet, finish.timesheet, flags set to true as required
     // Flags:
     // - if they clock in late or note at all
     // - if don't clock in before end of shift (shift.finish.rostered) then set
     //    shift.start.timesheet to 1 min before rostered  finish time
    week.staff.map((staffMember) => {
      // const totalsRow = Object.assign({}, payRateCategories)
      const totalsRow = {}
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
      // displayCategories.map((catagory) => {
      //   console.log(catagory)
      // })
      displayCategories.map((category) => {
        for (let cat in totalsRow) {
        //   cat === category ? category += 1 :
        // }
        console.log(category)
      })
      // for (let category in displayCategories) {
      //   for (let cat in totalsRow) {
      //     cat === category ? displayCategories[category] += 1 :
      //   }
      // }
      // console.log(displayCategories)
      payRateCategoriesTotalsRows.push(totalsRow)
    })

    this.setState({
      payRateCategoriesTotalsRows:  payRateCategoriesTotalsRows,
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
    if (!(this.state.displayCategories)) return ''

    // const displayCats = this.state.displayCategories.slice()
    // console.log(displayCats)
    // .filter((key) => {
    //   console.log(key)
    // })
    const { week } = this.props

    if ( !this.state.individual ) {
      return (
        <div>

          <div>
            {


                  {/*  <DisplayCategory /> */}
            }
          </div>


          <div>
            <Summary   week={week}
                      setIndividual={this.setIndividual}

            />
          </div>

        </div>
      )

    } else {
      return (
        <div>

          <div>
            <div>  {/* Space left of catagory headings and above names*/}</div>
            <div>  Ord Hrs           </div>
            <div>  Sat Hrs           </div>
            <div>  Annual Leave      </div>
            <div>  Sick Leave        </div>
            <div>  Public Hols       </div>
            <div>  L/S Leave         </div>
            <div>  Wayne Weekly      </div>
            <div>  Wayne Sat         </div>
            <div>  Wayne Sun         </div>
            <div>  Wayne Public Hols </div>
            <div>  Sleep Over        </div>
            <div>  Total             </div>
          </div>


          <div>
            <Individual week={week}
                        individual={this.state.individual}
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
