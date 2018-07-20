import React, { Component } from 'react'
import axios from 'axios'

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
    // const { date, value } = this.props
    // if (date !== this.props.date) {
    //   this.setState({ date: date })
    // }
    // if (value !== prevProps.value) {
    //   this.setState({ value: value })
    // }
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

  postStartTime = async (e) => {
    e.preventDefault()

    const server = 'http://localhost:4000'

    await this.setState({ value: this.formatTime_UserInputToDateObj(this.state.value) })

    this.setState({ editing: !this.state.editing })

    let valueObj =  {
                      weekID: this.state.weekID,
                      staffID: this.state.individual,
                      date: this.state.date,
                      shiftNumber: this.state.shift,
                      value: this.state.value,
                    }

    // valueObj = {
    //   weekID: ,
    //   staffID: ,
    //   date: ,
    //   shiftNumber: (number between 1 and 3),
    //   value: (date obj with time)
    // }
    // posted to /timesheets/start
    // same for finish time changes posted to /timesheets/finish

    // axios.post(server + '/timesheets/start', {valueObj}).then((response) => {
    //   console.log(response)
    // })
  }

  postFinishTime = async (e) => {
    e.preventDefault()

    const server = 'http://localhost:4000'

    await this.setState({ value: this.formatTime_UserInputToDateObj(this.state.value) })

    this.setState({ editing: !this.state.editing })

    // let ValueObj =  {
    //
    //                 }

    // axios.post(server + `/rosters/shift/${this.state.staffID}`, {shiftObj}).then((response) => {
    //   console.log(response)
    // })
  }

  edit = () => {
    this.setState({ editing: !this.state.editing })
  }

  render() {
    const { lable, date, value } = this.props


    if (lable === 'start') {
      if (!this.state.editing) {
        return (
          <div className='value-constainer' onClick={ () => this.edit() }>
          { this.formatTime_DateObjtoDisplayTime(this.state.value) }
          </div>
        )
      } else {
        return(
          <div className='value-constainer'>
            <form onSubmit={ this.postStartTime }>
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

    } else if (lable === 'finish') {
      if (!this.state.editing) {
        return (
          <div className='value-constainer' onClick={ () => this.edit() }>
            { this.formatTime_DateObjtoDisplayTime(this.state.value) }
          </div>
        )
      } else {
        return(
          <div className='value-constainer'>
            <form onSubmit={ this.postFinishTime }>
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
