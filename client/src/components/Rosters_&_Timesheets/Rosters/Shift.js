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
      date: '',
      shiftCategory: '',
      start: '',
      finish: '',
      currentEditing: false,
      currentModalIsOpen: false,
      validationError: false,
      shift: '',
      shiftID: '',
      addShift: ''
    }
  }

  componentDidMount = () => {
    const { weekID, staffID, date, shiftCategory, start, finish, shiftID } = this.props
    this.setState({
      weekID: weekID,
      staffID: staffID,
      // date: date,
      shiftID: shiftID,
    })
    this.setShift(shiftCategory, start, finish, date)
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { weekID, staffID, date, shiftCategory, start, finish, shiftID, addShift } = this.props
    // const { shiftCategory, start, finish, date } = this.props
    if (this.props !== prevProps) {
      this.setState({
        weekID: weekID,
        staffID: staffID,
        // date: date,
        shiftID: shiftID,
        addShift: addShift
      })
        this.setShift(shiftCategory, start, finish, date)
        if (addShift) {
          this.currentEdit()
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
      if (shift === 'start') {
        this.setState({
          start: dateCopy
        })
      } else {
        this.setState({
          finish: dateCopy
        })
      }
      return dateCopy
    } else {
      return ''
    }
  }

  currentEdit = () => {
    const { shiftCategory, start, finish } = this.state
    if (!this.state.currentEditing) {
      console.log('FALSEFALSEFALSE')
    }
    this.setState({ currentEditing: !this.state.currentEditing })
    this.currentOpenModal()
  }

  addShiftSubmit = async (event) => {
    event.preventDefault()
    try {
      const shiftCategory = event.target.shiftCategory.value
      const start = event.target.start.value
      const finish = event.target.finish.value
      if (shiftCategory && start && finish) {

        let shiftObj =  {
          staffID: this.state.staffID,
          weekID: this.props.currentWeek._id,
          shift: {
            date: this.state.date.toISOString().split('T')[0],
            shiftCategory: shiftCategory,
            start: {
              rostered: this.formatTime_UserInputToDateObj(start, 'start'),
              actual: '',
              timesheet: '',
              flag: false,
            },
            finish: {
              rostered: this.formatTime_UserInputToDateObj(finish, 'finish'),
              actual: '',
              timesheet: '',
              flag: false,
            }
          }
        }
        console.log(shiftObj, 'SHIFTOBJJBJOB')
      
      this.setState({
        shiftCategory,
        start: this.formatTime_UserInputToDateObj(start, 'start'),
        finish: this.formatTime_UserInputToDateObj(finish, 'finish')
      })
  
      // REPLACE IN DB
      axios.post(api + `/rosters/shift/${this.state.shiftID}`, {shiftObj, pushShift: true}).then((response) => {
        console.log(response, 'RES')
        console.log(this.props.weekID)
        this.props.fetchData(this.props.weekID)
      })
      this.currentCloseModal()
      this.props.stopAdd()
      // this.current Edit()
      } else {
        this.setState({
          validationError: true,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  currentHandleSubmit = async (event) => {
    event.preventDefault()
    try {
      const shiftCategory = event.target.shiftCategory.value
      const start = event.target.start.value
      const finish = event.target.finish.value
      if (shiftCategory && start && finish) {

      let shiftObj =  {
        staffID: this.state.staffID,
        weekID: this.props.currentWeek._id,
        shift: {
          date: this.props.date.toISOString().split('T')[0],
          shiftCategory: shiftCategory,
          start: {
            rostered: this.formatTime_UserInputToDateObj(start, 'start'),
            actual: '',
            timesheet: '',
            flag: false,
          },
          finish: {
            rostered: this.formatTime_UserInputToDateObj(finish, 'finish'),
            actual: '',
            timesheet: '',
            flag: false,
          }
        }
      }
    
    this.setState({
      shiftCategory,
      start: this.formatTime_UserInputToDateObj(start, 'start'),
      finish: this.formatTime_UserInputToDateObj(finish, 'finish')
    })

    // REPLACE IN DB
    axios.post(api + `/rosters/shift/${this.state.shiftID}`, {shiftObj, pushShift: false}).then((response) => {
      console.log(response, 'RES')
      console.log(this.props.weekID)
      this.props.fetchData(this.props.weekID)
    })
    this.currentCloseModal()
    this.props.stopAdd()    
    // this.currentEdit()
    } else {
      console.log('gothere')
      this.setState({
        validationError: true,
      })
    }
  } catch (error) {
    console.log(error)
    }
  }

  currentOpenModal = () => {
    this.setState({currentModalIsOpen: true});
  }

  currentCloseModal = () => {
    this.setState({
      currentModalIsOpen: false,
      // currentEditing: false
    });
  }

  render() {
    const { shiftCategory, start, finish } = this.state
    console.log(this.state, 'OPOPOPPOPOOPOPOPPO')
    if (this.state.currentEditing && !this.props.addShift) {
      return (
        <Modal isOpen={this.state.currentModalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.currentCloseModal} style={customStyles} contentLabel="Shift Modal" >
          <ShiftModal staffID={this.props.staffID} validation={this.state.validationError} handleSubmit={this.currentHandleSubmit} shiftCategory={shiftCategory} start={start} finish={finish} shiftCatChange={this.shiftCatChange} startTimeChange={this.startTimeChange} finishTimeChange={this.finishTimeChange} validationError={this.state.validationError} shiftAdd={false}/>

        </Modal>
      )
    } else if (this.state.currentEditing && this.props.addShift && (this.state.date === this.props.currentShiftDate)) {
      return (
        <Modal isOpen={this.state.currentModalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.currentCloseModal} style={customStyles} contentLabel="Shift Modal" >
          <ShiftModal staffID={this.props.staffID} validation={this.state.validationError} handleSubmit={this.currentHandleSubmit} shiftCategory={shiftCategory} start={start} finish={finish} shiftCatChange={this.shiftCatChange} startTimeChange={this.startTimeChange} finishTimeChange={this.finishTimeChange} validationError={this.state.validationError} shiftAdd={true} addShiftSubmit={this.addShiftSubmit} />

        </Modal>
      )
    } else {
      return (
        <React.Fragment>
          <div className="shift-block" onClick={ () => this.currentEdit() } >
            <div className="shift-time" >
              <div>{ this.formatTime_DateObjtoDisplayString(this.state.start) }</div>
              <div className="shift-middle"><p>-</p></div>
              <div>{ this.formatTime_DateObjtoDisplayString(this.state.finish) }</div>
            </div>
            <div className="shift-category">
              <p>{ this.state.shiftCategory.toUpperCase() }</p>
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default Shift
