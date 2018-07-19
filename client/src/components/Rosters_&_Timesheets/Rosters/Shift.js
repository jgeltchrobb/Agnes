import React, { Component } from 'react'
import axios from 'axios'
// import '../../../stylesheets/Shift.css'
import Modal from 'react-modal'
import ShiftModal from './ShiftModal'


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
      editing: false,
      modalIsOpen: false,
      validationError: false,
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

  edit = () => {
    this.setState({ editing: !this.state.editing })
    this.openModal()
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const shiftCategory = event.target.shiftCategory.value
    const start = event.target.start.value
    const finish = event.target.finish.value

    if (shiftCategory && start && finish) {
      const server = 'http://localhost:4000'

      let shift = {
        staffID: this.state.staffID,
        date: this.state.date,
        start: this.formatTime_UserInputToDateObj(start, 'start'),
        finish: this.formatTime_UserInputToDateObj(finish, 'finish'),
        shiftCategory: shiftCategory
      }
      
      this.props.addShift(shift)
      // await this.setState({
      // })
      this.editShift()

      let shiftObj =  {
        weekID: this.props.weekID,
        shift: {
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
      axios.post(server + `/rosters/shift/${this.state.staffID}`, {shiftObj}).then((response) => {
        console.log(response)
        this.closeModal(event.target)
      })
    } else {
      this.setState({
        validationError: !this.state.validationError,
      })
    }
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
    this.props.fetchData()
  }

  render() {
    if (this.state.editing) {
      // if in editing mode we want the form / modle to render
      return (
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} contentLabel="Shift Modal" >
          <ShiftModal staffID={this.props.staffID} validation={this.state.validationError} handleSubmit={this.handleSubmit} />  

        </Modal>
      )
{/* Jordan, try to remove this button if shifts.length === 3, so they can't add another */}
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
