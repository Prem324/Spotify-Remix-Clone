import React, {Component} from 'react'
import {FiPlay, FiPause} from 'react-icons/fi'
import {FaVolumeMute} from 'react-icons/fa'
import SongItem from '../SongItem'
import AlbumDisplayInfo from '../AlbumDisplayInfo'
import BackNavigation from '../BackNavigation'

import './index.css'

class Player extends Component {
  audioRef = React.createRef()

  state = {
    ...this.props,
    index: 0,
    pause: false,
    activeSongClass: 0,
    currTime: 0,
    seek: 0,
    volume: 5,
  }

  componentDidMount() {
    this.playerRef.addEventListener('timeupdate', this.timeUpdate)
    this.playerRef.addEventListener('ended', this.nextSong)
    this.playerRef.addEventListener('volumechange', this.adjustVolume)
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    this.playerRef.removeEventListener('timeupdate', this.timeUpdate)
    this.playerRef.removeEventListener('ended', this.nextSong)
    this.playerRef.removeEventListener('volumechange', this.adjustVolume)
    window.removeEventListener('resize', this.resize)
  }

  timeUpdate = () => {
    const {currentTime} = this.playerRef

    const inMins = Math.floor(currentTime / 60)
    const inSecs = Math.floor(currentTime % 60)
    const progress =
      100 * (this.playerRef.currentTime / this.playerRef.duration)

    if (inSecs < 10) {
      this.setState({currTime: `${inMins}:0${inSecs}`, seek: progress})
    } else {
      this.setState({currTime: `${inMins}:${inSecs}`, seek: progress})
    }
  }

  formatTime = secs => {
    const inMins = Math.floor(secs / 60)
    const inSecs = Math.floor(secs % 60)

    if (inSecs < 10) {
      return `${inMins}:0${inSecs}`
    }
    return `${inMins}:${inSecs}`
  }

  updatePlayer = () => {
    const {musicList, index, pause} = this.state

    const currentSong = musicList[index]
    const audio = new Audio(currentSong.audio)
    console.log(audio)
    this.playerRef.load()

    if (pause) {
      this.playerRef.play()
    } else {
      this.playerRef.pause()
    }
  }

  onClickSelectSong = indx => {
    this.setState(
      {
        index: indx,
        pause: true,
      },
      this.updatePlayer,
    )
  }

  playOrPause = () => {
    const {musicList, index, pause} = this.state
    const currentSong = musicList[index]
    const audio = new Audio(currentSong.audio)
    console.log(audio)

    if (!pause) {
      this.playerRef.play()
    } else {
      this.playerRef.pause()
    }
    this.setState({
      pause: !pause,
    })
  }

  prevSong = () => {
    const {index, activeSongClass, pause} = this.state

    if (index - 1 >= 0 && activeSongClass - 1 >= 0) {
      this.setState(
        {
          index: index - 1,
          activeSongClass: activeSongClass - 1,
        },
        this.updatePlayer,
      )
    } else {
      this.playerRef.pause()
      this.setState({pause: !pause})
    }
  }

  nextSong = () => {
    const {index, activeSongClass, pause, musicList} = this.state

    if (
      index + 1 === musicList.length &&
      activeSongClass + 1 === musicList.length
    ) {
      this.playerRef.pause()
      this.setState({pause: !pause})
    } else {
      this.setState(
        {
          index: index + 1,
          activeSongClass: activeSongClass + 1,
        },
        this.updatePlayer,
      )
    }
  }

  changeCurrTime = () => {
    const {seek} = this.state
    this.playerRef.currentTime = (this.playerRef.duration * seek) / 100
  }

  adjustVolume = () => {
    const {volume} = this.state
    this.playerRef.volume = volume / 10
  }

  changeSeekSlider = event => {
    this.setState({seek: event.target.value}, this.changeCurrTime)
  }

  changeVolumeSlider = event => {
    this.setState({volume: event.target.value}, this.adjustVolume)
  }

  getAlbumImageArtist = currentSong => {
    const {album, artists} = currentSong
    let image
    let artist

    if (album !== undefined) {
      image = album.images.reduce((prev, curr) =>
        prev.height < curr.height ? prev : curr,
      )
      image = image.url
    } else {
      image = '/img/no-album-image.png'
    }

    if (artists !== undefined) {
      artist = artists
    } else {
      artist = 'Artist'
    }

    return {albumImage: image, albumArtist: artist}
  }

  renderMusicControls = () => {
    const {musicList, index, pause, currTime, seek, volume} = this.state

    const currentSong = musicList[index]
    const {durationMs} = currentSong

    const {albumImage, albumArtist} = this.getAlbumImageArtist(currentSong)

    return (
      <>
        <audio
          ref={ref => {
            this.playerRef = ref
          }}
        >
          <source src={currentSong.previewUrl} type="audio/mp3" />
          <track kind="captions" srcLang="en" />
        </audio>

        <div className="album-details-track">
          <img src={albumImage} alt="album" className="album-image-track" />
          <div className="album-content-track">
            <p className="album-name-track">{currentSong.name}</p>
            <p className="artist-name-track">{`${albumArtist[0].name},${albumArtist[1].name}`}</p>
          </div>
        </div>

        <div className="track-control-section">
          <button
            type="button"
            onClick={this.playOrPause}
            className="play-pause-button"
          >
            {!pause ? (
              <FiPlay className="play-pause-icon" />
            ) : (
              <FiPause className="play-pause-icon" />
            )}
          </button>

          <div className="progress-container">
            <span className="time-update">
              {this.formatTime(currTime)}/{this.formatTime(durationMs / 1000)}
            </span>
            <input
              type="range"
              value={seek}
              onChange={this.changeSeekSlider}
              max="100"
              className="progress-bar"
            />
          </div>
        </div>

        <div className="volume-control">
          <FaVolumeMute className="volume-icon" />
          <input
            type="range"
            max="10"
            value={volume}
            onChange={this.changeVolumeSlider}
            className="volume-bar"
          />
          <span>{Math.round(volume * 10)}%</span>
        </div>
      </>
    )
  }

  renderSongsList = () => {
    const {musicList} = this.state
    return (
      <div className="tracks-list">
        {musicList.map((item, key = 0) => (
          <SongItem
            songData={item}
            selectSong={this.onClickSelectSong}
            index={key}
            key={key}
          />
        ))}
      </div>
    )
  }

  render() {
    const {displayInfo, section} = this.state
    return (
      <div className="player-container">
        <BackNavigation />
        <div className="playlist-container">
          <AlbumDisplayInfo displayInfo={displayInfo} section={section} />
          <div id="columns-row">
            <span id="column-name">Track</span>
            <span id="column-name">Album</span>
            <span id="column-name">Time</span>
            <span id="column-name">Artist</span>
            <span id="column-name">Added</span>
          </div>
          <hr />
          <ul className="playlist">{this.renderSongsList()}</ul>
        </div>
        <div className="music-controls">{this.renderMusicControls()}</div>
      </div>
    )
  }
}

export default Player
