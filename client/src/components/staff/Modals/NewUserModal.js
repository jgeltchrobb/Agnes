import React from 'react'
import { api, setJwt } from '../../../api/init'
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

class NewUserModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addHours: false,
      validationError: false,
      name: '',
      email: ''
    }
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  submitHandler = (event) => {
    event.preventDefault()
    const name = event.target.name.value
    const email = event.target.email.value
    const password = event.target.password.value
    const pin = event.target.pin.value
    let role = 'staff'
    let checkedValue = document.querySelector('#admin-check').checked
    if (checkedValue) {role = 'admin'}
    console.log(role)
    const loginObj = {name: name, email: email, password: password, role: role, pin: parseInt(pin)}
    if (name && email && password && pin) {

      this.props.closeModal()
      api.post('users', loginObj).then((response) => {
        this.props.fetchData()
      })
    } else {
      this.setState({validationError: !this.state.validationError})
    }
  }

  render () {
    console.log(this.state.email, this.state.name)
    if (this.state.validationError) {
      return (
        <div >
          <h2>New Staff</h2>
          <h4 >Enter a name and email</h4>
          <form onSubmit={this.submitHandler}>
            <input autofocus="autofocus" name='name' placeholder='Name' /> <br /> <br />
            <input name='email' placeholder='Email' /> <br /> <br />
            <input name='password' placeholder='Password' /> <br /> <br />
            <input name='pin' type='number' placeholder='PIN' /> <br /> <br />
            <label>Admin user <input id='admin-check' name='admin' type='checkbox' /></label> <br /> <br />

            <button type='submit' >Submit</button>
          </form>
        </div>
      )
    } else {
      return (
        <div >
        <h2>New Staff</h2>
        <form onSubmit={this.submitHandler}>
          <input name='name' placeholder='Name' /> <br /> <br />
          <input name='email' placeholder='Email' /> <br /> <br />
          <input name='password' placeholder='Password' /> <br /> <br />
          <input name='pin' placeholder='PIN' /> <br /> <br />
          <label>Admin user <input id='admin-check' name='admin' type='checkbox' /></label> <br /> <br />
          <button type='submit' >Submit</button>
        </form>
      </div>
    ) 
  }
  }
}

export default NewUserModal