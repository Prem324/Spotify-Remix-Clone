import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMessage: ''}

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  onLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 3})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMessage: errorMsg})
  }

  onChanageUsername = event => {
    this.setState({username: event.target.value})
  }

  onChanagePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showErrorMsg, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <div>
          <form onSubmit={this.onLogin}>
            <img
              src="https://res.cloudinary.com/dlakv8a0n/image/upload/v1729151434/SpotifyRemix/music-icon.png"
              alt="login website logo"
            />
            <h1>Spotify Remix</h1>
            <label htmlFor="username">USERNAME</label>
            <input
              onChange={this.onChanageUsername}
              value={username}
              id="username"
              type="text"
            />
            <label htmlFor="password">PASSWORD</label>
            <input
              onChange={this.onChanagePassword}
              value={password}
              id="password"
              type="password"
            />
            <button type="submit">Login</button>
            {showErrorMsg && <p>{errorMessage}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
