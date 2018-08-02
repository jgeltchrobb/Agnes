import React, { Component } from 'react'
import { api, setJwt } from '../../api/init'
import '../../stylesheets/LoginPage.css'

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
      setJwt(response.data.token)
      this.props.setTokenState(response.data.token, true)
      this.props.setCurrentUserRole(response.data.role)
      console.log(JSON.stringify(response.data.user))

      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('role', response.data.user.role)
    })
  }

  render() {
    // Basic login details
    return (
      <div className="login-page">
        <form className="login-form-container" onSubmit={this.handleSubmit} >
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />

          {/* <label>Remember me:<input id="checkbox" name="remember" type="checkbox" /></label><br /> */}
          <div className="login-button-container">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    )
  }
}

export default LogInPage
