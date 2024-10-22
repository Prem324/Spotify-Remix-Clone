import './index.css'

const NewReleasesAlbumTrackItem = props => {
  const {trackItemData} = props
  const {name, durationMs, artists} = trackItemData
  return (
    <li className="track-item">
      <p className="track-name">{name}</p>
      <p className="track-duration">{durationMs}</p>
      <p className="track-popularity">{artists[0].name}</p>
    </li>
  )
}

export default NewReleasesAlbumTrackItem
