import React, { Component } from 'react'
import Value from './Value'

class ValuesRow extends Component {

  state = {
    rowHeading: '',
    rowData: '',
  }

  componentDidMount = () => {
    const { specificRow } = this.props
    const rowHeading = Object.keys(specificRow)[0]
    this.setState({
      rowHeading: rowHeading,
      rowData: specificRow[rowHeading][0],
    })
  }
  componentDidUpdate = (prevProps, prevState) => {
    const { specificRow } = this.props
    // console.log(specificRow[Object.keys(prevProps.specificRow)[0]][0])
    if (this.state.rowData !== specificRow[Object.keys(prevProps.specificRow)[0]][0]) {
      this.setState({
        rowData: specificRow[Object.keys(specificRow)[0]][0],
      })
    }
  }


  render() {

    // console.log(rowHeading, rowData)

    return (
      <div className='week-constainer'>

  {/*      <div className='values-row-container'>
          <Value
          />
        </div>
*/}
      </div>
    )
  }
}

export default ValuesRow
