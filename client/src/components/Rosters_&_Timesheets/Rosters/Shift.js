import React, { Component } from 'react'
import axios from 'axios'
// import '../../../stylesheets/Shift.css'
import Modal from 'react-modal'
import ShiftModal from './ShiftModal'
import '../../../stylesheets/Shift.css'


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
      shiftID: ''
    }

  }

  componentDidMount = () => {
    const { weekID, staffID, date, shiftCategory, start, finish, shiftID } = this.props
    this.setState({
      weekID: weekID,
      staffID: staffID,
      date: date,
      shiftID: shiftID,
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
    console.log(shiftCategory, start, finish, 'OOOOOOOOOOOOOOOOOOOOO')
    if (!this.state.currentEditing) {
      console.log('FALSEFALSEFALSE')
    }
    this.setState({ currentEditing: !this.state.currentEditing })
    this.currentOpenModal()
  }

  currentHandleSubmit = async (event) => {
    event.preventDefault()
    try {

    const server = 'http://localhost:4000'

    const shiftCategory = event.target.shiftCategory.value
    const start = event.target.start.value
    const finish = event.target.finish.value

    let shiftObj =  {
      staffID: this.state.staffID,
      weekID: this.props.weekID,
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

    this.setState({
      shiftCategory,
      start: this.formatTime_UserInputToDateObj(start, 'start'),
      finish: this.formatTime_UserInputToDateObj(finish, 'finish')
    })


    if (this.state.shiftID) {
      // REPLACE IN DB
      axios.post(server + `/rosters/shift/${this.state.shiftID}`, {shiftObj, pushShift: false}).then((response) => {
        console.log(response, 'RES')
        this.currentCloseModal(event.target)
      })
    } else {
      // PUSH to DB for CURRENT DATE
    }
    
    this.currentEdit()
    this.props.fetchData()
  } catch (error) {
      this.setState({
        validationError: !this.state.validationError,
      })
    }
  }

  currentOpenModal = () => {
    this.setState({currentModalIsOpen: true});
  }

  currentCloseModal = () => {
    this.setState({
      currentModalIsOpen: false,
      editing: false
    });
    // this.props.fetchData()
  }

  // shiftCatChange = (event) => {
  //   this.setState({
  //     shiftCategory: event.target.value
  //   })
  // }

  // startTimeChange = (event) => {
  //   this.setState({
  //     start: event.target.value
  //   })
  // }

  // finishTimeChange = (event) => {
  //   this.setState({
  //     finish: event.target.value
  //   })
  // }

  addShift = () => {
    console.log('poop')
  }

  render() {
    const { shiftCategory, start, finish } = this.state
    if (this.state.currentEditing) {
      // if in editing mode we want the form / modle to render
      return (
        <Modal isOpen={this.state.currentModalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.currentCloseModal} style={customStyles} contentLabel="Shift Modal" >
          <ShiftModal staffID={this.props.staffID} validation={this.state.validationError} handleSubmit={this.currentHandleSubmit} shiftCategory={shiftCategory} start={start} finish={finish} shiftCatChange={this.shiftCatChange} startTimeChange={this.startTimeChange} finishTimeChange={this.finishTimeChange} />

        </Modal>
      )
{/* Jordan, try to remove this button if shifts.length === 3, so they can't add another */}
  // if NOT in editing mode we want the shift to render
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
          {/* <button onClick={ () => this.addShift() }> add shift </button> */}
        </React.Fragment>
      )
    }

  }

}

export default Shift
