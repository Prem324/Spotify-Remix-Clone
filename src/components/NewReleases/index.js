import {Link} from 'react-router-dom'
import './index.css'

const NewReleases = props => {
  const {newReleasesData} = props
  const {id, name, images} = newReleasesData

  const image = images[1]

  return (
    <li>
      <Link to={`album-details/${id}`}>
        <div>
          <p>{name}</p>
          <img src={image.url} alt="new release album" />
        </div>
      </Link>
    </li>
  )
}

export default NewReleases
