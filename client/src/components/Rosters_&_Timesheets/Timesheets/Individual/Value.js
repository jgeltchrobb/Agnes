import React, { Component } from 'react'

class Value extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount = () => {

  }
  componentDidUpdate = (prevProps, prevState) => {

  }


  formatData = () => {

  }

  formatTime_DateObjtoDisplayString = (time) => {
    if (time) {
      let hr = new Date(time).getHours()
        if (hr < 10) {
          hr = ('0' + hr)
        }
      let min = new Date(time).getMinutes()
        if (min < 10) {
          min = ('0' + min)
        }
      return ( `${hr} : ${min}` )
    } else { return '' }
  }



  render() {
    const { value } = this.props

    if (typeof(value) === 'object') {
      return (
        <div className='value-constainer'>
          { this.formatTime_DateObjtoDisplayString(value) }
        </div>
      )
    } else {
      return (
        <div className='value-constainer'>
          { value }
        </div>
      )
    }
  }
}

export default Value
