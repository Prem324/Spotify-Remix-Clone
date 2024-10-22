import {Link} from 'react-router-dom'

import './index.css'

const EditorsPicks = props => {
  const {editorsPicksData} = props
  const {id, name, images} = editorsPicksData

  const imageUrl = images[0]

  return (
    <li className="editors-picks-item">
      <Link className="link-item" to={`/playlists-details/${id}`}>
        <div className="editors-picks-content">
          <img
            className="editors-picks-item-image"
            src={imageUrl.url}
            alt="featured playlists"
          />
          <p className="editors-picks-item-name">{name}</p>
        </div>
      </Link>
    </li>
  )
}

export default EditorsPicks
