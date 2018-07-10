import React, { Component } from 'react'
import Summary from './summary/Summary'
import Individual from './individual/Individual'

class Timesheets extends Component {
  constructor(props) {
    super(props)

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
      min = 0
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
          return roundDown(actual)
        }
      } else {

        if (startOrFinish === 'start') {
          return roundUp(actual)
        }
        if (startOrFinish === 'finish') {
          return rostered
        }
      }
      // If no clock time then return rostered
    } else return rostered
  }

  componentDidMount = () => {

    const payRateCategories = ['Ordinary', 'Sat', 'Sun', 'Night', 'Public Holiday', 'Wayne Ordinary', 'Wayne Sat', 'Wayne Sun', 'Wayne Night', 'Wayne Public Holiday']
    const entitlements = ['Annual Leave', 'Sick Leave', 'Long Service Leave', 'Sleep-over Bonus']

    const { week } = this.props

    const payRateCategoriesTotalsRows = []

    var DayShiftDefinitionClockinBeforeHours = 20
    const milliToHours = 0.00000027777777777778

    // Posting to the data:
     // start.timesheet, finish.timesheet, flags set to true as required
     // Flags:
     // - if they clock in late or note at all
     // - if don't clock in before end of shift (shift.finish.rostered) then set
     //    shift.start.timesheet to 1 min before rostered  finish time
    week.staff.map((staffMember) => {
      staffMember.shifts.map((shift) => {
        if (!shift.start.timesheet) {
          const start = timesheetEntry('start', shift.start.rostered, shift.start.actual)
          // do below except don't post, rather update state and then update db from state behind the scenes
          if (start > shift.start.rostered) {
            setState: shift.start.flag = true
          }
          setState: start.timesheet = start
        }

        if (!shift.finish.timesheet) {
          const finish = timesheetEntry('finish', shift.finish.rostered, shift.finish.actual)
          // do below except don't post, rather update state and then update db from state behind the scenes
          // if (finish < shift.finish.rostered) {
            // Post to db: shift.start.flag = true
          // }
        // Post to db: finish.timesheet = finsih
        }

        const shiftHours = (Number(((shift.finish.timesheet - shift.start.timesheet) * milliToHours).toFixed(2)))

        const totalsRow = {}

        if (!shift.publicHoliday) {

          if (shift.start.timesheet.getHours() < DayShiftDefinitionClockinBeforeHours) {

            if (shift.start.timesheet.getDay() === 6) {
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
      payRateCategoriesTotalsRows.push(totalsRow)
    })

    const finalTotalsRows = payRateCategoriesTotalsRows.map((row) => {
      // for (let cat in row) {
      //   if (row[cat])
      //   console.log(row[cat])
      // }
    })

    this.setState({
      finalTotalsRows: finalTotalsRows,
    })
  }


  setIndividual = (staffID) => {
    this.setState({ individual: staffID })
  }

  removeIndividual = () => {
    this.setState({ individual: '' })
  }

  render() {
    const { week } = this.props

    if ( !this.state.individual ) {
      return (
        <div>

          <div>
            <div>{/* Space to the left of catagory headings and above names*/}</div>
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
