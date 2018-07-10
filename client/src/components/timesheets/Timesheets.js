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



  setIndividual = (staffID) => {
    this.setState({ individual: staffID })
  }

  removeIndividual = () => {
    this.setState({ individual: '' })
  }

  render() {

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
