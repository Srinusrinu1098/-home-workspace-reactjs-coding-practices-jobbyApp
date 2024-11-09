import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {usernameInput: '', passwordInput: '', errorMsg: ''}

  usernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  passwordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  renderSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 5})
    const {history} = this.props
    history.replace('/')
  }

  renderFailure = error => {
    this.setState({errorMsg: error})
  }

  submitLogin = async event => {
    const {usernameInput, passwordInput} = this.state
    event.preventDefault()

    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username: usernameInput, password: passwordInput}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        this.renderSuccess(data.jwt_token)
      } else if (response.status === 400) {
        this.renderFailure(data.error_msg)
      }
    } catch (error) {
      this.renderFailure('Something went wrong, please try again later.')
    }
  }

  render() {
    const {errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.submitLogin}>
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            className="user-input"
            id="username"
            type="text"
            placeholder="Username"
            onChange={this.usernameInput}
          />
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="user-input"
            id="password"
            type="password"
            placeholder="Password"
            onChange={this.passwordInput}
          />
          <button className="button-login" type="submit">
            Login
          </button>
          {errorMsg && <p className="error-message">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
