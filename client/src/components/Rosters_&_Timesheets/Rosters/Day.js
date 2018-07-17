import React, { Component } from 'react'
import axios from 'axios'
import '../../../stylesheets/Shift.css'

class Day extends Component {
  constructor(props) {
    super(props)
    this.state = {
      this.props.shifts,
      // this is array of shifts (one or two shifts objects)
      editing: false,
    }
  }


  componentDidMount = () => {
    // const { shifts, staffID } = this.props
    // this.setDayCell(shifts, staffID)
  }

  componentDidUpdate = (prevProps, prevState) => {
    // console.log(this.state)
    // console.log(prevState)
  }

  // setDayCell = (shifts, staffID) => {
  //   shifts.
  //   this.setState({
  //     date: date,
  //     staffID: staffID,
  //     shiftCategory: shiftCategory,
  //     start: start,
  //     finish: finish,
  //     editing: false,
  //   })
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



  updateShiftCategory = (e) => {
    this.setState({ shiftCategory: e.target.value })
  }

  updateStart = (e, shiftArrayIndexNumber) => {
    this.setState({ start: e.target.value })
    console.log(shiftArrayIndexNumber)
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
    // currently set up to handle

    const server = 'http://localhost:4000'

    e.preventDefault()

    // await this.setState({ start: this.addTime(this.state.start) })
    // await this.setState({ finish: this.addTime(this.state.finish) })
    //
    // this.editShift()
    //
    // let shiftObj =
    // {
    //   weekID: this.props.weekID,
    //   shifts:
    //     {
    //       date: this.state.date,
    //       shiftCategory: this.state.shiftCategory,
    //       start: {
    //         rostered: this.state.start,
    //         actual: '',
    //         timesheet: '',
    //         flag: false,
    //       },
    //       finish: {
    //         rostered: this.state.finish,
    //         actual: '',
    //         timesheet: '',
    //         flag: false,
    //       }
    //     }
    //   }
    //
    //
    //
    // axios.post(server + `/rosters/shift/${this.state.staffID}`, {shiftObj}).then((response) => {
    //   console.log(response)
    // })
  }

  addShift = () => {

    // this.setState({  })
  }

  render() {
    // if (typeof(this.state.start) == String) {return ''}
    const shifts = this.state.shifts

      if (this.state.editing) {
        // if in editing mode we want the form / modle to render
    {/*    if (shifts.length > 1) {
          // if multiple shifts (2), we want a form/modle for each shift
          // Jordan, we probably just want one submit button so could combine the forms into one modle
          return (
            <div>

              <form id='form' onSubmit={ this.handleSubmit }>
                <input  placeholder='Shift Category'
                        value={ shifts[0].shiftCategory }
                        onChange={this.updateShiftCategory }
                />
                <input  placeholder='start'
                        value={ shifts[0].start }
                        onChange={ this.updateStart(0) }
                        type='time'
                />
                <input  placeholder='finish'
                        value={ shifts[0].finish }
                        onChange={ this.updateFinish }
                        type='time'
                />
                <input type="submit" />
              </form>

              <form id='form' onSubmit={ this.handleSubmit }>
                <input  placeholder='Shift Category'
                        value={ shifts[1].shiftCategory }
                        onChange={this.updateShiftCategory }
                />
                <input  placeholder='start'
                        value={ shifts[1].start }
                        onChange={ this.updateStart }
                        type='time'
                />
                <input  placeholder='finish'
                        value={ shifts[1].finish }
                        onChange={ this.updateFinish }
                        type='time'
                />
                <input type="submit" />
                // if multiple shifts we DON'T want the add shift button
              </form>

            </div>
          )
        } else {
    */}      // if only one shift we want only one form/modle
          return (
            <div>

              <form id='form' onSubmit={ this.handleSubmit }>
                <input  placeholder='Shift Category'
                        value={ shifts[0].shiftCategory }
                        onChange={this.updateShiftCategory }
                />
                <input  placeholder='start'
                        value={ shifts[0].start }
                        onChange={ this.updateStart }
                        type='time'
                />
                <input  placeholder='finish'
                        value={ shifts[0].finish }
                        onChange={ this.updateFinish }
                        type='time'
                />
                <input type="submit" />
                // if just one shift we want the add shift button
                <button onClick={ () => this.addShift() }>
                  add shift
                <button>
              </form>

            </div>
          )
    {/*    }
        // if NOT in editing mode we want the day cell to render
      } else if (shifts.length > 1) {
        // if multiple (2) shifts we want to divide the cell in two
        return (
          <div onClick={ () => this.editShift() }>
            <div className="shift-time">
              <div>{ this.formatTime( shifts[0].start) }</div>
              <div>{ this.formatTime( shifts[0].finish) }</div>
            </div>
            <div className="shift-category">
              <p>{ shifts[0].shiftCategory.toUpperCase() }</p>
            </div>
          </div>
          <div onClick={ () => this.editShift() }>
            <div className="shift-time">
              <div>{ this.formatTime( shifts[1].start) }</div>
              <div>{ this.formatTime( shifts[1].finish) }</div>
            </div>
            <div className="shift-category">
              <p>{ shifts[0].shiftCategory.toUpperCase() }</p>
            </div>
          </div>
        )
  */}    } else {
        // if one shift we use the whole cell
        return (
          <div onClick={ () => this.editShift() }>
            <div className="shift-time">
              <div>{ this.formatTime( shifts[0].start) }</div>
              <div>{ this.formatTime( shifts[0].finish) }</div>
            </div>
            <div className="shift-category">
              <p>{ shifts[0].shiftCategory.toUpperCase() }</p>
            </div>
          </div>
        )
      }

  }
}

export default Day
