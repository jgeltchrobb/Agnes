import React, { Component } from 'react'
import Summary from './summary/Summary'
import Individual from './individual/Individual'

class Timesheets extends Component {
  constructor(props) {
    super(props)

    // individual: staffID
    this.state = {
      individual: '',

    }
  }

  startTime = (rStart, aStart) => {
    // If no clock time then what is it?
    if (aStart) {
      if (aStart <= rStart) {
        return rStart
      } else {
        // Do post request to create flag!
        // return actual (rounded UP to next 15 min interval)
        // for now just return actual
        return aStart
      }
    } else return rStart
  }

  finishTime = (rFinish, aFinish) => {
    // If no clock time then what is it?
    if (aFinish) {
        if (aFinish >= rFinish) {
          return rFinish
        } else {
          // Do post request to create flag!
          // return actual (rounded DOWN to next 15 min interval)
          // for now just return actual
          return aFinish
        }
      } else return rFinish
  }

  componentDidMount = () => {
    const staffNames = []
    const timesheetData = []
    // [ { staffID:'', shifts:[ { date:'', startRostered:'', startActual:'', start:''
    //                                   , finishRostered:'', finishActual:'', finish:''
    // }]}]


    this.props.week.staff.map((staffMember) => {
      // When have user model will loop through it and
      // if (staffID === staffMember.staffID) then push to staffNames
      // {staffID: 'name'}
      // for now just push the staffID:
      staffNames.push(staffMember.staffID)
      // then at the bottom we also add the staffID to the timesheetData object

      // Here we create the shift array that will be added to the timesheetData
      // object
      const staffMemberShifts = []
      staffMember.shifts.map((shift) => {
        const rStart = shift.start.rostered
        const aStart = shift.start.actual
        const rFinish = shift.finish.rostered
        const aFinish = shift.finish.actual
        staffMemberShifts.push(
          {
            date:           shift.date,
            category:       shift.shiftCategory,
            startRostered:  rStart,
            startActual:    aStart,
            start:          this.startTime(rStart, aStart),
            finishRostered:  rFinish,
            finishActual:    aFinish,
            finish:         this.finishTime(rFinish, aFinish),
          }
        )
      })
      // Push each timesheetData object to the timesheetData Array
      timesheetData.push(
        {
          staffID:  staffMember.staffID,
          shifts:   staffMemberShifts
        }
      )
    })

    this.setState({
      staffNames:     staffNames,
      timesheetData:  timesheetData
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
            <div>  {/* Space to the left of catagory headings and above names*/}</div>
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
            <Summary  staffNames={this.state.staffNames}
                      timesheetData={this.state.timesheetData}
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
            <Individual staffNames={this.state.staffNames}
                        timesheetData={this.state.timesheetData}
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
