import React, { Component } from 'react'
import Name from '../Name'
import TotalsRow from '../TotalsRow'

class Summary extends Component {
  constructor(props) {
    super(props)


  }

  // componentDidMount = () => {
  //
  //   const { timesheetData } = this.props
  //   // [ { staffID:'', shifts:[ { date:'', catagory:'',
  //   //                            startRostered:'', startActual:'', start:'',
  //   //                            finishRostered:'', finishActual:'', finish:''
  //   // }]}]
  //
  //   const totalsRows = []
  //   // [{ staffID: '', floor: '', room: '', kitchen: '', cat4: '', cat5: '',
  //   //      cat6: '', cat7: '', cat8: '', cat9: '', cat10: '', cat11: ''} }, {},{}]
  //
  //   timesheetData.map((staffMember) => {
  //     const totalsRow = {}
  //     totalsRow.staffID = staffMember.staffID
  //     // here need to loop through the official category list and poplate into
  //     // totalsRow as keys set to empty strings
  //     // Fuck.. what are the categories and how do they translate to hours categories?
  //     staffMember.shifts.map((shift) => {
  //       if (!totalsRow[shift.category]) {
  //         totalsRow[shift.category] = (shift.finish - shift.start)
  //       } else {
  //         totalsRow[shift.category] += (shift.finish - shift.start)
  //       }
  //     })
  //     totalsRows.push(totalsRow)
  //   })
  //   this.setState({
  //     totalsRows: totalsRows,
  //   })
  //
  // }

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
