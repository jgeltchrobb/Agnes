import React, { Component } from 'react'
import axios from 'axios'
import '../../../stylesheets/Shift.css'

class Shift extends Component {
  state = {
    date: '',
    staffID: '',
    shiftCategory: '',
    start: '',
    finish: '',
    editing: false,
  }


  componentDidMount = () => {
    const { date, staffID, shiftCategory, start, finish } = this.props
    this.setShiftState(date, staffID, shiftCategory, start, finish)
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //   console.log(this.state)
  //   console.log(prevState)
  //
  // }

  setShiftState = (date, staffID, shiftCategory, start, finish) => {
    this.setState({
      date: date,
      staffID: staffID,
      shiftCategory: shiftCategory,
      start: start,
      finish: finish,
      editing: false,
    })
  }

  formatTime = (time) => {
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



  updateShiftCategory = (e) => {
    this.setState({ shiftCategory: e.target.value })
  }

  updateStart = (e) => {
    this.setState({ start: e.target.value })

  }

  updateFinish = (e) => {
    this.setState({ finish: e.target.value })
  }

  addTime = (timeString) => {
    let hrsMinsStringArray = timeString.split(':')
    let hrs = Number(hrsMinsStringArray[0])
    let mins = Number(hrsMinsStringArray[1])
    var dateCopy = new Date(this.props.date)
    dateCopy.setHours(hrs)
    dateCopy.setMinutes(mins)
    return dateCopy
  }

  editShift = () => {
    this.setState({ editing: !this.state.editing })
  }

  handleSubmit = async (e) => {

    const server = 'http://localhost:4000'

    e.preventDefault()

    await this.setState({ start: this.addTime(this.state.start) })
    await this.setState({ finish: this.addTime(this.state.finish) })

    this.editShift()

    let shiftObj = { weekID: this.props.weekID, shift: {
          date: this.state.date,
          shiftCategory: '!!!!!!!!!!!!!!!!!!!!!!!!',
          start: {
            rostered: this.state.start,
            actual: '',
            timesheet: '',
            flag: false,
          },
          finish: {
            rostered: this.state.finish,
            actual: '',
            timesheet: '',
            flag: false,
          }
        }
      }

    axios.post(server + `/rosters/shift/${this.state.staffID}`, {shiftObj}).then((response) => {
      console.log(response)
    })
  }

  render() {
    // if (typeof(this.state.start) == String) {return ''}
    const { date, staffID, shiftCategory, start, finish } = this.props

      if (this.state.editing) {
        return (
          <form id='form' onSubmit={this.handleSubmit}>

            <input  placeholder='Shift Category'
                    value={this.state.shiftCategory}
                    onChange={this.updateShiftCategory}
            />
            <input  placeholder='start'
                    value={this.state.start}
                    onChange={this.updateStart}
                    type='time'
            />
            <input  placeholder='finish'
                    value={this.state.finish}
                    onChange={this.updateFinish}
                    type='time'
            />
            <input type="submit" />

          </form>

        )
      } else {
        return (
          <div onClick={() => this.editShift()}>
            <div className="shift-time">
              <div>{this.formatTime(this.state.start)}</div>
              <div>{this.formatTime(this.state.finish)}</div>
            </div>
            <div className="shift-category">
              <p>{this.state.shiftCategory.toUpperCase()}</p>
            </div>
          </div>
        )
      }

  }
}

export default Shift
