import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginSection extends Component {
  state = {username: '', password: '', errorMsg: '', showErrMsg: false}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showErrMsg: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  render() {
    const {username, password, errorMsg, showErrMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-section">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-img"
          />
          <form className="login-form" onSubmit={this.onSubmitForm}>
            <label htmlFor="username" className="login-labels">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              value={username}
              className="user-input-box"
              placeholder="Username"
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password" className="login-labels">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              id="password"
              className="user-input-box"
              placeholder="Password"
              onChange={this.onChangePassword}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrMsg && <p className="error-msg">*{errorMsg}</p>}
            <p className="login-name-pass">Name: raja, Pass: raja@2021</p>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginSection
