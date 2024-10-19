import {Link} from 'react-router-dom'

import './index.css'

const EditorsPicks = props => {
  const {editorsPicksData} = props
  const {id, name, images} = editorsPicksData

  let image

  if (images !== undefined) {
    image = images.reduce((prev, curr) =>
      prev.height > curr.height ? prev : curr,
    )
    image = image.url
  } else {
    image = null
  }

  return (
    <Link to={`/playlists-details/${id}`}>
      <div>
        <img src={image} alt="featured playlists" />
        <p>{name}</p>
      </div>
    </Link>
  )
}

export default EditorsPicks
