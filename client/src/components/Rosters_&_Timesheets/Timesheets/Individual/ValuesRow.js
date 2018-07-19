import React, { Component } from 'react'
import Value from './Value'

class ValuesRow extends Component {
  // constructor(props) {
  //   super(props)
  //
  //   this.state = {
  //     lable:        this.props.lable,
  //     specificRow:  this.props.specificRow,
  //     weekDates:    this.props.weekDates,
  //   }
  // }

  componentDidMount = () => {
  }

  componentDidUpdate = (prevProps, prevState) => {
    // const { specificRow, weekDates } = this.props
    // if (weekDates !== prevProps.weekDates) {
    //   this.setState({
    //     specificRow: specificRow,
    //     weekDates: weekDates,
    //   })
    // }
  }


  render() {

    const { lable, specificRow, weekDates, weekID, individual } = this.props

    if (!specificRow || !weekDates) {return ''}

    return (
      <div className='week-constainer'>

       <div className='values-row-container'>

          <Value lable={ lable } date={ weekDates[0] } value={ specificRow[0] } weekID={ weekID } individual={ individual } />
          <Value lable={ lable } date={ weekDates[1] } value={ specificRow[1] } weekID={ weekID } individual={ individual } />
          <Value lable={ lable } date={ weekDates[2] } value={ specificRow[2] } weekID={ weekID } individual={ individual } />
          <Value lable={ lable } date={ weekDates[3] } value={ specificRow[3] } weekID={ weekID } individual={ individual } />
          <Value lable={ lable } date={ weekDates[4] } value={ specificRow[4] } weekID={ weekID } individual={ individual } />
          <Value lable={ lable } date={ weekDates[5] } value={ specificRow[5] } weekID={ weekID } individual={ individual } />
          <Value lable={ lable } date={ weekDates[6] } value={ specificRow[6] } weekID={ weekID } individual={ individual } />

        </div>
      </div>
    )
  }
}

export default ValuesRow
