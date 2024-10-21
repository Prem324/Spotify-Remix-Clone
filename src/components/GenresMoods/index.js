import {Link} from 'react-router-dom'
import './index.css'

const GenresMoods = props => {
  const {genresMoodsData} = props
  const {id, name, icons} = genresMoodsData

  const iconUrl = icons[0]
  return (
    <li>
      <Link to={`/category-playlists/${id}`}>
        <img src={iconUrl.url} alt="category" />
        <p>{name}</p>
      </Link>
    </li>
  )
}

export default GenresMoods
