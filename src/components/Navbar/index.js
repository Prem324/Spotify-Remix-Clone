import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdLogOut} from 'react-icons/io'

import './index.css'

const Navbar = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="navbar-container">
      <img
        src="https://res.cloudinary.com/dlakv8a0n/image/upload/v1729151434/SpotifyRemix/music-icon-4x.png"
        alt="website logo"
        className="navbar-logo"
      />
      <button className="logout-button" type="button" onClick={onLogout}>
        <IoMdLogOut className="logout-icon" />
        Logout
      </button>
    </div>
  )
}

export default withRouter(Navbar)
