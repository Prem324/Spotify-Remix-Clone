import {Link} from 'react-router-dom'
import './index.css'

const CategoryPlaylistItem = props => {
  const {categoryDetails} = props
  const {id, name, images, tracks} = categoryDetails
  const imageUrl = images[0]
  return (
    <li className="category-item">
      <Link to={`/playlists-details/${id}`}>
        <div className="category-content">
          <img
            className="category-item-image"
            src={imageUrl.url}
            alt="category"
          />
          <p className="category-item-name">{name}</p>
          <p className="category-item-tracks-count">{`${tracks.total} Tracks`}</p>
        </div>
      </Link>
    </li>
  )
}

export default CategoryPlaylistItem
