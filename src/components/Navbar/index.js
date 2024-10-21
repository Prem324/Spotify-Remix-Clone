import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Navbar = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div>
      <img
        src="https://res.cloudinary.com/dlakv8a0n/image/upload/v1729151434/SpotifyRemix/music-icon.png"
        alt="website logo"
      />
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Navbar)
