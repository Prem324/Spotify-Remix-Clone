import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div>
    <img
      src="https://res.cloudinary.com/dlakv8a0n/image/upload/v1729271940/SpotifyRemix/404-not-found.png"
      alt="page not found"
    />
    <h1>PAGE NOT FOUND</h1>
    <Link to="/">
      <button type="button">Home Page</button>
    </Link>
  </div>
)

export default NotFound
