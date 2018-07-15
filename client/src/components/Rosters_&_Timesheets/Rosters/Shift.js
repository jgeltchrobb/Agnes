import React, { Component } from 'react'
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

  // setStaffName = (staffID, users) => {
  //   var staffName = ''
  //   this.props.users.map((user) => {
  //     if (user.staffID.toString() === staffID) {
  //       staffName = user.staffName
  //     }
  //   })
  //   this.setState({ staffName: staffName})
  // }

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


  handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitted')
    this.editShift()
  }

  updateShiftCategory = (e) => {
    this.setState({shiftCategory: e.target.value})
  }
  updateStart = (e) => {
    this.setState({start: e.target.value})
  }
  updateFinish = (e) => {
    this.setState({finish: e.target.value})
  }

  editShift = () => {

    this.setState({ editing: !this.state.editing })

  }

  render() {
    const { date, staffID, shiftCategory, start, finish } = this.props

    console.log(this.state.editing)

      if (this.state.editing) {
        return (
          <form onSubmit={this.handleSubmit}>

            <input  placeholder='Shift Category'
                    value={this.state.shiftCategory}
                    onChange={this.updateShiftCategory}
            />
            <input  placeholder='start'
                    value={this.state.start}
                    onChange={this.updateStart}
            />
            <input  placeholder='finish'
                    value={this.state.finish}
                    onChange={this.updateFinish}
            />
            <input type="submit" value="Submit" />

          </form>

        )
      } else {
        return (
          <div onClick={() => this.editShift()}>
            <div className="shift-time">
              <div>{this.formatTime(start)}</div>
              <div>{this.formatTime(finish)}</div>
            </div>
            <div className="shift-category">
              <p>{shiftCategory.toUpperCase()}</p>
            </div>
          </div>
        )
      }

  }
}

export default Shift
