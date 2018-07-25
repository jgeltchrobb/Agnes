import React, { Component } from 'react'
import axios from 'axios'
// import '../../../stylesheets/Shift.css'
import Modal from 'react-modal'
import ShiftModal from './ShiftModal'
import '../../../stylesheets/Shift.css'

const api = 'http://localhost:4000'


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Shift extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weekID: '',
      staffID: '',
      weekDate: '',
      date: '',
      shiftCategory: '',
      start: '',
      finish: '',
      currentEditing: false,
      currentModalIsOpen: false,
      validationError: false,
      shift: '',
      shiftID: '',
      addShift: '',
      removeShiftVal: '',
      timeError: ''
    }
  }

  componentDidMount = () => {
    const { weekID, staffID, date, shiftCategory, start, finish, shiftID, weekDate } = this.props
    this.setState({
      weekID: weekID,
      staffID: staffID,
      shiftID: shiftID,
      weekDate: weekDate,
    })
    this.setShift(shiftCategory, start, finish, date)
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { weekID, staffID, date, shiftCategory, start, finish, shiftID, addShift, removeShiftVal, weekDate } = this.props
    if (this.props !== prevProps) {
      this.setState({
        weekID: weekID,
        staffID: staffID,
        shiftID: shiftID,
        weekDate: weekDate,
        addShift: addShift,
        removeShiftVal: removeShiftVal
      })
      this.setShift(shiftCategory, start, finish, date)
      if (addShift) {
        this.setState({
          currentEditing: !this.state.currentEditing,
          currentModalIsOpen: !this.state.currentModalIsOpen
        })
      }
      if (removeShiftVal) {
        this.setState({
          currentEditing: false,
          // removeShift: true
        })
      }
    }
  }

  setShift = (shiftCategory, start, finish, date) => {
    this.setState ({
      shiftCategory: shiftCategory,
      start: start,
      finish: finish,
      date: date,
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

  formatTime_UserInputToDateObj = (timeString, shift) => {
    if (timeString) {
      let hrsMinsStringArray = timeString.split(':')
      let hrs = Number(hrsMinsStringArray[0])
      let mins = Number(hrsMinsStringArray[1])
      var dateCopy = new Date(this.props.date)
      dateCopy.setHours(hrs)
      dateCopy.setMinutes(mins)
      // if (shift === 'start') {
      //   this.setState({
      //     start: dateCopy
      //   })
      // } else {
      //   this.setState({
      //     finish: dateCopy
      //   })
      // }
      return dateCopy
    } else {
      return ''
    }
  }

  currentEdit = () => {
    const { shiftCategory, start, finish } = this.state
    this.setState({ currentEditing: !this.state.currentEditing })
    this.currentOpenModal()
  }

  setNightShift = async (event, startTime, finishTime, shiftCategory, push, sunday) => {
    let pubHol = event.target.pubHol
    let wayneShift = event.target.wayne
    let shiftObj =  {
      staffID: this.state.staffID,
      weekID: this.props.currentWeek._id,
      publicHoliday: pubHol.checked,
      wayneShift: wayneShift.checked,
      shift: {
        date: this.state.date.toISOString().split('T')[0],
        shiftCategory: shiftCategory,
        sleepOver: true,
        start: {
          rostered: startTime,
          actual: '',
          timesheet: '',
          flag: false,
        },
        finish: {
          rostered: this.formatTime_UserInputToDateObj('22:00', 'finish'),
          actual: '',
          timesheet: '',
          flag: false,
        }
      }
    }

    this.setState({
      shiftCategory,
      start: startTime,
      finish: this.formatTime_UserInputToDateObj('22:00', 'finish'),
    })

    // REPLACE IN DB
    let nightResponse = await axios.post(api + `/rosters/shift/${this.state.shiftID}`, {shiftObj, pushShift: push})
    let weekID = nightResponse.data._id
    let shiftDate = this.state.date
    shiftDate.setDate(shiftDate.getDate() + 1)
    console.log(shiftObj)

    if (sunday) {
      let weekDate = new Date(this.state.weekDate)
      weekDate.setDate(weekDate.getDate() + 7)
      let weekResponse = await axios.get(api + '/rosters/' + 'date/' + weekDate)
      shiftDate = new Date(weekResponse.data.date)
      weekID = weekResponse.data._id

      shiftObj.weekID = weekID
      shiftObj.shift.firstHalfID = nightResponse.data._id
      shiftObj.shift.date = shiftDate.toISOString().split('T')[0]
      shiftObj.shift.start.rostered = this.formatTime_UserInputToDateObj('06:00', 'start')
      shiftObj.shift.finish.rostered = finishTime
      console.log(shiftObj)
      await axios.post(api + `/rosters/shift/${this.state.shiftID}`, {shiftObj, pushShift: push})

    } else {
      shiftObj.shift.date = shiftDate.toISOString().split('T')[0]
      shiftObj.shift.start.rostered = this.formatTime_UserInputToDateObj('06:00', 'start')
      shiftObj.shift.finish.rostered = finishTime
      shiftObj.shift.firstHalfID = nightResponse.data._id
      console.log(shiftObj)

      await axios.post(api + `/rosters/shift/${this.state.shiftID}`, {shiftObj, pushShift: push})
    }
      this.props.fetchData(this.props.weekID)
    }

  addShiftSubmit = async (event) => {
    event.preventDefault()
    try {
      let shiftCategory = event.target.shiftCategory.value
      let start = event.target.start.value
      let finish = event.target.finish.value
      start = this.formatTime_UserInputToDateObj(start, 'start')
      finish = this.formatTime_UserInputToDateObj(finish, 'finish')
      
      
//       if (shiftCategory && start && finish) {
//         let shiftCheck = this.props.checkShiftTimes(start, finish, this.state.date, false, false)

      if (finish < start) {
        let shiftDay = this.state.date.getDay()
        console.log(shiftDay, 'SHIDAT')
        let sunday = false
        console.log(shiftDay, "DAYDAYDAYDAYDAYD")
        if (shiftDay === 0) { sunday = true }
        this.setNightShift(event, start, finish, shiftCategory, true, sunday)
        //STOP ADD??
      } else if (shiftCategory && start && finish) {
          
        let shiftCheck = this.props.checkShiftTimes(start, finish, this.state.date, false, false)
        
        if (shiftCheck) {
          let shiftObj =  {
            staffID: this.state.staffID,
            weekID: this.props.currentWeek._id,
            publicHoliday: event.target.pubHol.checked,
            wayneShift: event.target.wayne.checked,
            shift: {
              date: this.state.date.toISOString().split('T')[0],
              shiftCategory: shiftCategory,
              start: {
                rostered: start,
                actual: '',
                timesheet: '',
                flag: false,
              },
              finish: {
                rostered: finish,
                actual: '',
                timesheet: '',
                flag: false,
              }
            }
          }

        this.setState({
          shiftCategory,
          start: start,
          finish: finish,
        })

        // REPLACE IN DB
        axios.post(api + `/rosters/shift/${this.state.shiftID}`, {shiftObj, pushShift: true}).then((response) => {
          this.props.fetchData(this.props.weekID)
        })
        // this.currentCloseModal()
        this.props.stopAdd()
      } else {
      // this.props.stopAdd()

        this.setState({
          timeError: true
        })
      }
    } else {
        this.setState({
          validationError: true,
        })
      }
    } catch (error) {
    }
  }

  currentHandleSubmit = async (event) => {
    event.preventDefault()
    try {
      let shiftCategory = event.target.shiftCategory.value
      let start = event.target.start.value
      let finish = event.target.finish.value
      start = this.formatTime_UserInputToDateObj(start, 'start')
      finish = this.formatTime_UserInputToDateObj(finish, 'finish')

      if (finish < start) {
        let shiftDay = this.state.date.getDay()
        let sunday = false
        console.log(shiftDay, "DAYDAYDAYDAYDAYD")
        if (shiftDay === 0) { sunday = true }
        this.setNightShift(event, start, finish, shiftCategory, false, sunday)
        //STOP ADD??
      } else if (shiftCategory && start && finish) {
        let shiftCheck = this.props.checkShiftTimes(start, finish, this.state.date, this.state.shiftID, true)
        if (shiftCheck) {

          let shiftObj =  {
            staffID: this.state.staffID,
            weekID: this.props.currentWeek._id,
            publicHoliday: event.target.pubHol.checked,
            wayneShift: event.target.wayne.checked,
            shift: {
              date: this.props.date.toISOString().split('T')[0],
              shiftCategory: shiftCategory,
              start: {
                rostered: start,
                actual: '',
                timesheet: '',
                flag: false,
              },
              finish: {
                rostered: finish,
                actual: '',
                timesheet: '',
                flag: false,
              }
            }
          }
        this.setState({
          shiftCategory: shiftCategory,
          start: start,
          finish: finish
        })

        // REPLACE IN DB
        axios.post(api + `/rosters/shift/${this.state.shiftID}`, {shiftObj, pushShift: false}).then((response) => {
          this.props.fetchData(this.props.weekID)
        })
        this.currentCloseModal()
        // this.props.stopAdd()
        // this.currentEdit()
    } else {
      this.setState({
        timeError: true
      })
    }
  } else {
      this.setState({
        validationError: true,
      })
    }
  } catch (error) {
    console.log(error)
    }
  }

  removeCurrentShift = () => {
    // console.log('yo')
    // this.setState({
    //   shiftCategory: '',
    //   start: '',
    //   finish: ''
    // })
    this.props.removeShift(this.props.staffID, this.props.shiftID)
  }

  currentOpenModal = () => {
    this.setState({currentModalIsOpen: true});
  }

  currentCloseModal = () => {
    this.setState({
      currentModalIsOpen: false,
      currentEditing: false
    });
  }

  render() {
    const { role, shiftCategory, start, finish } = this.state
    if (this.state.currentEditing && !this.props.addShift) {
      return (
        <React.Fragment>
          <Modal isOpen={this.state.currentModalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.currentCloseModal} style={customStyles} contentLabel="Shift Modal" >
            <ShiftModal staffID={this.props.staffID} validation={this.state.validationError} handleSubmit={this.currentHandleSubmit} shiftCategory={shiftCategory} start={start} finish={finish} validationError={this.state.validationError} shiftAdd={false} removeShift={this.props.removeShift} shiftID={this.props.shiftID} timeError={this.state.timeError } />

          </Modal>
            <div className="shift-block">
              <div className="shift-time" >
                <div>{ this.formatTime_DateObjtoDisplayString(this.state.start) }</div>
                <div className="shift-middle"><p>-</p></div>
                <div>{ this.formatTime_DateObjtoDisplayString(this.state.finish) }</div>
              </div>
              <div className="shift-category">
                <p>{ this.state.shiftCategory.toUpperCase() }</p>
              </div>
            </div>
            <button id='remove-shift-btn' onClick={this.removeCurrentShift}>x</button>

        </React.Fragment>
      )
    } else if (this.state.currentEditing && this.props.addShift && (this.state.date === this.props.currentShiftDate)) {
      return (
        <React.Fragment>
          <Modal isOpen={this.state.currentModalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.currentCloseModal} style={customStyles} contentLabel="Shift Modal" >
            <ShiftModal staffID={this.props.staffID} validation={this.state.validationError} handleSubmit={this.currentHandleSubmit} shiftCategory={shiftCategory} start={start} finish={finish} validationError={this.state.validationError} shiftAdd={true} addShiftSubmit={this.addShiftSubmit} closeModal={this.currentCloseModal} timeError={this.state.timeError} />

          </Modal>
            <div className="shift-block">
              <div className="shift-time" >
                <div>{ this.formatTime_DateObjtoDisplayString(this.state.start) }</div>
                <div className="shift-middle"><p>-</p></div>
                <div>{ this.formatTime_DateObjtoDisplayString(this.state.finish) }</div>
              </div>
              <div className="shift-category">
                <p>{ this.state.shiftCategory.toUpperCase() }</p>
              </div>
              <button id='remove-shift-btn' onClick={this.removeCurrentShift}>x</button>
            </div>
        </React.Fragment>
      )
    } else if ((!this.state.start && !this.state.finish)) {
      return (
        <React.Fragment>
                  {/* // <div className="shift-block" onClick={ () => this.currentEdit() } > */}
            <div className="shift-time" >
              <div></div>
              <div className="shift-middle"><p></p></div>
              <div></div>
            </div>
            <div className="shift-category">
              <p></p>
            </div>
          {/* // </div> */}
          </React.Fragment>
      )
    }
    
    else {
      return (
        <React.Fragment>
          <div className="shift-block" onClick={ () => this.currentEdit() } >
            <div className="shift-time" >
              <div>{ this.formatTime_DateObjtoDisplayString(this.state.start) }</div>
              <div className="shift-middle"><p></p></div>
              <div>{ this.formatTime_DateObjtoDisplayString(this.state.finish) }</div>
            </div>
            <div className="shift-category">
              <p>{ this.state.shiftCategory.toUpperCase() }</p>
            </div>
        {/* { (role !== 'admin') ? '' : */}
        <button id='remove-shift-btn' onClick={this.removeCurrentShift}>x</button>

        {/* } */}
          </div>
        </React.Fragment>
      )
    }
  }
}

export default Shift
