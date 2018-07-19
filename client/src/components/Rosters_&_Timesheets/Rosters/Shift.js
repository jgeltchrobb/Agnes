import React, { Component } from 'react'
import axios from 'axios'
// import '../../../stylesheets/Shift.css'

class Shift extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weekID: '',
      staffID: '',
      date: '',
      shiftCategory: '',
      start: '',
      finish: '',
      editing: false,
    }

  }


  componentDidMount = () => {
    const { weekID, staffID, date, shiftCategory, start, finish } = this.props
    this.setState({
      weekID: weekID,
      staffID: staffID,
      date: date,
    })
    this.setShift(shiftCategory, start, finish)
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { shiftCategory, start, finish } = this.props
    if (this.props !== prevProps) {
      this.setShift(shiftCategory, start, finish)
    }
  }

  setShift = (shiftCategory, start, finish) => {
    this.setState ({
      shiftCategory: shiftCategory,
      start: start,
      finish: finish,
    })
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

  updateShiftCategory = (e) => {
    this.setState({ shiftCategory: e.target.value })

  }
  updateStart = (e) => {
    this.setState({ start: e.target.value })
  }
  updateFinish = (e) => {
    this.setState({ finish: e.target.value })
  }

  formatTime_UserInputToDateObj = (timeString) => {
    let hrsMinsStringArray = timeString.split(':')
    let hrs = Number(hrsMinsStringArray[0])
    let mins = Number(hrsMinsStringArray[1])
    var dateCopy = new Date(this.props.date)
    dateCopy.setHours(hrs)
    dateCopy.setMinutes(mins)
    return dateCopy
  }

  edit = () => {
    this.setState({ editing: !this.state.editing })
  }

  post = async (e) => {
    e.preventDefault()

    const server = 'http://localhost:4000'

    await this.setState({ start: this.formatTime_UserInputToDateObj(this.state.start) })
    await this.setState({ finish: this.formatTime_UserInputToDateObj(this.state.finish) })

    this.editShift()

    let shiftObj =  {
                      weekID: this.props.weekID,
                      shift:  {
                                date: this.state.date,
                                shiftCategory: this.state.shiftCategory,
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

    // axios.post(server + `/rosters/shift/${this.state.staffID}`, {shiftObj}).then((response) => {
    //   console.log(response)
    // })
  }

  addShift = () => {

    // this.setState({  })
  }

  render() {

    if (this.state.editing) {
      // if in editing mode we want the form / modle to render
      return (
        <div>

          <form id='form' onSubmit={ this.post }>

            <input  placeholder='Shift Category'
                    value={ this.state.shiftCategory }
                    onChange={this.updateShiftCategory }
            />
            <input  placeholder='start'
                    value={ this.state.start }
                    onChange={ this.updateStart }
                    type='time'
            />
            <input  placeholder='finish'
                    value={ this.state.finish }
                    onChange={ this.updateFinish }
                    type='time'
            />
            <input type="submit" />
          </form>
          {/* Jordan, try to remove this button if shifts.length === 3, so they can't add another */}
          <button onClick={ () => this.addShift() }> add shift </button>

        </div>
      )
  // if NOT in editing mode we want the shift to render
    } else {
      return (
        <div onClick={ () => this.edit() }>
          <div className="shift-time">
            <div>{ this.formatTime_DateObjtoDisplayString(this.state.start) }</div>
            <div>{ this.formatTime_DateObjtoDisplayString(this.state.finish) }</div>
          </div>
          <div className="shift-category">
            <p>{ this.state.shiftCategory.toUpperCase() }</p>
          </div>
        </div>
      )
    }

  }

}

export default Shift
