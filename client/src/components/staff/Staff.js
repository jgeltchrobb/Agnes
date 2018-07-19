import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import StaffRow from './StaffRow'
import SideBar from './SideBar'
import Header from './Header'
import NewUser from './NewUser'
import NewUserModal from './Modals/NewUserModal'
import classNames from 'classnames'

import axios from 'axios'


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

const api = 'http://localhost:4000'

class Staff extends Component {
  constructor() {
    super()
    this.state = {
      revealed: '',
      staffData: [],
      staffRosters: [],
      rosteredTotals: [],
      totals: '',
      modalIsOpen: false,
      addHours: false
    }
  }
  
  componentDidMount = () => {
    this.fetchStandard()
  }

  clickHandler = (event) => {
    if (this.state.revealed === event.target.getAttribute('name') || this.state.revealed === event.target.innerText) {
      this.setState({revealed: ''})
    } else {
      this.setState({
        revealed: event.target.getAttribute('name') || event.target.innerText
      })
    }
  }

  fetchStandard = () => {
    axios.get(api + '/standardHours').then((response) => {
      for (let staff of response.data) {
        staff.totalHours = parseInt(localStorage.getItem(`${staff.name}`))
      }
      return response
    }).then((result) => {
      console.log(result)
      this.fetchRosters(result.data)
    })
  }

  fetchRosters = (staffData) => {
    // let date = new Date().toISOString().split('T')[0];
    let date = "2018-07-09"
    axios.get(api + '/rosters' + '/date/' + date).then((response) => {
      return response.data
    }).then((obj) => {
      console.log(obj)
      this.calcRosters(obj, staffData)
    }).catch((error) => {
      console.log(error)
    })
  }

  calcRosters = (roster, staffData) => {
    let totals = []
    const DayShiftDefinitionClockinBeforeHours = 20
    const milliToHours = 0.00000027777777777778
    for (let staff of roster.staff) {
      console.log(staff, 'staff')
      let totalsRow = {}
      for (let shift of staff.shifts) {
        let finish = new Date(shift.finish.rostered)
        let start = new Date(shift.start.rostered)
        const shiftHours = (Number(((finish - start) * milliToHours).toFixed(2)))
        if (!shift.publicHoliday) {

          if (start.getHours() < DayShiftDefinitionClockinBeforeHours) {

            if (start.getDay() === 6) {
              if (shift.wayneShift) {
                totalsRow['WayneSat'] ? totalsRow['WayneSat'] += shiftHours : totalsRow['WayneSat'] = shiftHours
              } else {
                totalsRow['Sat'] ? totalsRow['Sat'] += shiftHours : totalsRow['Sat'] = shiftHours
              }
            } else if (start.getDay() === 0) {
                if (shift.wayneShift) {
                  totalsRow['WayneSun'] ? totalsRow['WayneSun'] += shiftHours : totalsRow['WayneSun'] = shiftHours
                } else {
                  totalsRow['Sun'] ? totalsRow['Sun'] += shiftHours : totalsRow['Sun'] = shiftHours
                }
            } else {
                if (shift.wayneShift) {
                  totalsRow['WayneOrdinary'] ? totalsRow['WayneOrdinary'] += shiftHours : totalsRow['WayneOrdinary'] = shiftHours
                } else {
                  totalsRow['Ordinary'] ? totalsRow['Ordinary'] += shiftHours : totalsRow['Ordinary'] = shiftHours
                }
            }
          } else {
              if (shift.wayneShift) {
                totalsRow['WayneNight'] ? totalsRow['WayneNight'] += shiftHours : totalsRow['WayneNight'] = shiftHours
              } else {
                totalsRow['Night'] ? totalsRow['Night'] += shiftHours : totalsRow['Night'] = shiftHours
              }
          }
        } else if (shift.publicHoliday && shift.wayneShift) {
          totalsRow['WaynePublicHoliday'] ? totalsRow['WaynePublicHoliday'] += shiftHours : totalsRow['WaynePublicHoliday'] = shiftHours

        } else {
          totalsRow['PublicHoliday'] ? totalsRow['PublicHoliday'] += shiftHours : totalsRow['PublicHoliday'] = shiftHours
        }
      }
      totals.push({...totalsRow, staffID: staff.staffID})
    }
    this.setState({staffData: staffData, totals: totals})
  }

  categoryChecker = (key) => {
    switch (key) {
      case 'Ordinary':
        return 'Ordinary'
      case 'Sunday':
        return 'Sun'
      case 'Saturday':
        return 'Sat'
      case 'Night':
        return 'Night'
      case 'Public Holiday':
        return 'PublicHoliday'
      case 'Wayne Ordinary':
        return 'WayneOrdinary'
      case 'Wayne Saturday':
        return 'WayneSat'
      case 'Wayne Sunday':
        return 'WayneSun'
      case 'Wayne Night':
        return 'WayneNight'
      case 'Wayne Public Holiday':
        return 'WaynePublicHoliday'
    }
  }

  passTotal = (total) => {
    let name = ''
    let currentTotal = ''
    let plus = ''
    let diff = ''
    let staffData = [...this.state.staffData]
    if (total.orgHours < total.hours) {
      plus = true
      diff = total.hours - total.orgHours
    } else if (total.orgHours > total.hours) {
      plus = false
      diff = total.hours - total.orgHours
    } else {
      plus = null
      diff = total.orgHours
    }
    for (let obj of staffData) {
      if (obj._id === total.standardID) {
        name = obj.name
        currentTotal = parseFloat(localStorage.getItem(`${name}`))
        for (let cat of obj.categories) {
          if (cat._id === total.id) {
            cat.hoursWorked = total.hours
            if (plus) {
              currentTotal = currentTotal + diff
            } else if (plus === false) {
              currentTotal = currentTotal + diff
            }
          }
        }
      }
    }
    localStorage.setItem(`${name}`, currentTotal)
    this.setState({staffData})
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        <button onClick={this.openModal} >New Staff</button>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal" >
          <NewUserModal fetchData={this.fetchStandard} openModal={this.openModal} afterOpenModal={this.afterOpenModal} closeModal={this.closeModal} />
        </Modal>
        <div className="staff-container" >
          <SideBar staffData={this.state.staffData} handleClick={this.clickHandler} revealed={this.state.revealed} fetchStandard={this.fetchStandard} totals={this.state.totals} />
          <div className="scroll-container" onScroll={this.handleScroll}>
            <div className="staff-header">
              <Header payRates={this.props.payRates} />
            </div>
            <StaffRow staffData={this.state.staffData} revealed={this.state.revealed} fetchStandard={this.fetchStandard} passTotal={this.passTotal} rosteredTotals={this.state.totals} />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Staff
