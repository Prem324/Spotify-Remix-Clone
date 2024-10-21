import {Link} from 'react-router-dom'

import './index.css'

const EditorsPicks = props => {
  const {editorsPicksData} = props
  const {id, name, images} = editorsPicksData

  const imageUrl = images[0]

  return (
    <li>
      <Link to={`/playlists-details/${id}`}>
        <div>
          <img src={imageUrl.url} alt="featured playlists" />
          <p>{name}</p>
        </div>
      </Link>
    </li>
  )
}

export default EditorsPicks
