import moment from 'moment'

import './index.css'

const SongItem = props => {
  const {songData, index, selectSong, displayInfo} = props
  const {artists, album, name, durationMs} = songData

  const onClickSelectSong = () => {
    selectSong(index)
  }
  const getDurationTime = inMilliSecs => {
    const inSecs = moment.duration(inMilliSecs).seconds()
    const inMins = moment.duration(inMilliSecs).minutes()

    if (inSecs < 10) {
      return `0${inMins}:0${inSecs}`
    }
    return `0${inMins}:${inSecs}`
  }

  const getFormaDistance = added => {
    const addedAgo = moment(added, 'YYYYMMDD').fromNow()
    return addedAgo
  }

  return (
    <li onClick={onClickSelectSong} className="song-row">
      <div id="song-info">
        <span id="song-name">{name}</span>
        <span id="album-name">{album.name}</span>
        <span id="duration">{getDurationTime(durationMs)}</span>
        <span id="artist-name">{artists[0].name}</span>
        <span id="added">
          {album
            ? getFormaDistance(album.release_date)
            : getFormaDistance(displayInfo.releaseDate)}
        </span>
      </div>
    </li>
  )
}

export default SongItem
