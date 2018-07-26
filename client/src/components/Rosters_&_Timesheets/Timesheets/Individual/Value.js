import React, { Component } from 'react'
import { api, setJwt } from '../../../../api/init'

class Value extends Component {
  constructor(props) {
    super(props)

    this.state = {
      weekID: this.props.weekID,
      individual: this.props.individual,
      date: this.props.date,
      shift: Number(this.props.shift),
      value: this.props.value,
      editing: false,
    }
  }

  componentDidMount = () => {

  }

  componentDidUpdate = (prevProps, prevState) => {

  }

  formatTime_UserInputToDateObj = (timeString) => {
    let hrsMinsStringArray = timeString.split(':')
    let hrs = Number(hrsMinsStringArray[0])
    let mins = Number(hrsMinsStringArray[1])
    var dateCopy = new Date(this.props.date)
    // problem here is that
    dateCopy.setHours(hrs)
    dateCopy.setMinutes(mins)
    return dateCopy
  }

  formatTime_DateObjtoDisplayTime = (time) => {
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

  update = (e) => {
    this.setState({ value: e.target.value })

  }

  postTimesheetTime = async (lable, e) => {
    e.preventDefault()


    await this.setState({ value: this.formatTime_UserInputToDateObj(this.state.value) })

    this.setState({ editing: !this.state.editing })

    let timeObj =  {
                      weekID: this.state.weekID,
                      staffID: this.state.individual,
                      date: this.state.date,
                      shiftNumber: this.state.shift,
                      startOrFinish: lable,
                      value: this.state.value,
                    }

    // api.post('timesheets/timesheet-time/update', {timeObj}).then((response) => {
    //   console.log(response)
    // })

  }

  edit = () => {
    this.setState({ editing: !this.state.editing })
  }

  render() {
    const { lable, date, value } = this.props

    if (lable === 'break' || lable === 'total' || lable === 'grandTotal') {
      return (
        <div className='value-constainer'>
          { value }
        </div>
      )
    } else {
      if (!this.state.editing) {
        return (
          <div className='value-constainer' onClick={ () => this.edit() }>
          { this.formatTime_DateObjtoDisplayTime(this.state.value) }
          </div>
        )
      } else {
        return(
          <div className='value-container'>
            <form onSubmit={ (e) => this.postTimesheetTime(lable, e) }>
              <input  placeholder='value'
                      value={ this.state.value }
                      onChange={ this.update }
                      type='time'
              />
              <input type='Submit' />
            </form>
          </div>
        )
      }
    }

  }
}

export default Value
