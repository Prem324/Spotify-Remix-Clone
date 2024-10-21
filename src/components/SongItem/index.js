import ReactAudioPlayer from 'react-audio-player'
import './index.css'

const SongItem = props => {
  const {songData} = props
  return (
    <div>
      <p>{songData.name}</p>
      <ReactAudioPlayer src={songData.previewUrl} controls autoplay loop />
    </div>
  )
}

export default SongItem
