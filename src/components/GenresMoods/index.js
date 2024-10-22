import {Link} from 'react-router-dom'
import './index.css'

const GenresMoods = props => {
  const {genresMoodsData} = props
  const {id, name, icons} = genresMoodsData

  const iconUrl = icons[0]
  return (
    <li className="genres-moods-item">
      <Link className="link-item" to={`/category-playlists/${id}`}>
        <div className="genres-moods-content">
          <img
            className="genres-moods-item-image"
            src={iconUrl.url}
            alt="category"
          />
          <p className="genres-moods-item-name">{name}</p>
        </div>
      </Link>
    </li>
  )
}

export default GenresMoods
