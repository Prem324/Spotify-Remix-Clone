import './index.css'

const SongItem = props => {
  const {songData} = props
  return (
    <div>
      <p>{songData.name}</p>
      <a href={songData.previewUrl}>Play Song</a>
    </div>
  )
}

export default SongItem
