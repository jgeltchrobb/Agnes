import React, { Component } from 'react'
import TotalsRow from '../TotalsRow'

class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // fullTotalsRows: []
    }

  }



  componentDidMount = () => {



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
