import React from 'react'
import classNames from 'classnames'
import axios from 'axios'

const api = 'http://localhost:4000/users'

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
    if (name && email) {

      axios.post(api, {name: name, email: email}).then((response) => {
        this.props.fetchData()
        this.props.closeModal()
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
          <button type='submit' >Submit</button>
        </form>
      </div>
    ) 
  }
  }
}

export default NewUserModal