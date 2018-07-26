import React, { Component } from 'react'
import { api, setJwt } from '../../api/init'

class LogInPage extends Component {


  handleSubmit = (event) => {
    event.preventDefault()
    // let checkedValue = document.querySelector('#checkbox').checked;
    let login = {
      email: event.target.email.value,
      password: event.target.password.value,
      // check: checkedValue
    }
    api.post('users/login', login).then((response) => {
      console.log(response)
      setJwt(response.data.token)
      this.props.setTokenState(response.data.token, true)
      this.props.setCurrentUserRole(response.data.role)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('role', response.data.role)
    })
  }

  render() {
    // Basic login details
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <label>Email: <input type="email" name="email" /></label><br />
          <label>Password: <input type="password" name="password" /></label><br />
          {/* <label>Remember me:<input id="checkbox" name="remember" type="checkbox" /></label><br /> */}
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default LogInPage
