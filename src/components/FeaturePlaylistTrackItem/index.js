import './index.css'

const FeaturePlaylistTrackItem = props => {
  const {trackItemData, albumDisplayInfo} = props
  const {name, album, durationMs, artists} = trackItemData
  return (
    <li className="track-item-details">
      <p>{name}</p>
      <p>{album.name}</p>
      <p>{durationMs}</p>
      <p>{artists[0].name}</p>
    </li>
  )
}

export default FeaturePlaylistTrackItem
