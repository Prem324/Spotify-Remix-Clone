import {Component} from 'react'
import Player from '../Player'

import './index.css'

class SongItem extends Component {
  state = {
    ...this.props,
  }

  renderSongsList = () => {
    const {musicList, displayInfo} = this.state

    return (
      <div className="columns-container">
        <span className="column-name">Track</span>
        <span className="column-name">Album</span>
        <span className="column-name">Time</span>
        <span className="column-name">Artist</span>
        <span className="column-name">Added</span>
      </div>
    )
  }

  render() {
    const {displayInfo, section} = this.state
    return (
      <div>
        <div className="album-details-section">
          <img
            className="album-image"
            src={displayInfo.images[0].url}
            alt="album"
          />
          <div className="album-details-content">
            <p>{section}</p>
            <h1>{displayInfo.name}</h1>
          </div>
        </div>
        <ul>{this.renderSongsList()}</ul>
      </div>
    )
  }
}

export default SongItem
