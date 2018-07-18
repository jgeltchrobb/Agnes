import React, { Component } from 'react'
import Value from './Value'

class ValuesRow extends Component {

  state = {
    specificRow: '',
    weekDates: '',
    // rowHeading: '',
    // rowData: '',
  }

  componentDidMount = () => {
    const { specificRow, weekDates } = this.props
    // const rowHeading = Object.keys(specificRow)[0]
    // this.setState({
    //   rowHeading: rowHeading,
    //   rowData: specificRow[rowHeading][0],
    // })

    this.setState({
      specificRow: specificRow,
      weekDates: weekDates,
    })
  }
  componentDidUpdate = (prevProps, prevState) => {
    const { specificRow, weekDates } = this.props
    // if (this.state.rowData !== specificRow[Object.keys(prevProps.specificRow)[0]][0]) {
    //   this.setState({
    //     rowData: specificRow[Object.keys(specificRow)[0]][0],
    //   })
    // }
    if (this.state.specificRow !== prevProps.specificRow || this.state.weekDates !== prevProps.weekDates) {
      this.setState({
        specificRow: specificRow,
        weekDates: weekDates,
      })
    }
  }


  render() {

    const { specificRow, weekDates } = this.state

    console.log(specificRow)

    // console.log(heading)
    // console.log(specificRow)
    // console.log(weekDates)


    return (
      <div className='week-constainer'>

       <div className='values-row-container'>
          <Value date={weekDates[0]} value={specificRow[0]} />
          <Value date={weekDates[1]} value={specificRow[1]} />
          <Value date={weekDates[2]} value={specificRow[2]} />
          <Value date={weekDates[3]} value={specificRow[3]} />
          <Value date={weekDates[4]} value={specificRow[4]} />
          <Value date={weekDates[5]} value={specificRow[5]} />
          <Value date={weekDates[6]} value={specificRow[6]} />

        </div>
      </div>
    )
  }
}

export default ValuesRow
