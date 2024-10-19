import {Component} from 'react'
import SongItem from '../SongItem'

class Player extends Component {
  state = {
    ...this.props,
  }

  renderSongsList = () => {
    const {musicList, displayInfo} = this.state

    return (
      <>
        {musicList.map((item, key = 0) => (
          <SongItem
            songData={item}
            audioData={this.audioData}
            displayInfo={displayInfo}
            key={key}
          />
        ))}
      </>
    )
  }

  render() {
    return (
      <div>
        <h1>Songs List</h1>
        <ul>{this.renderSongsList()}</ul>
      </div>
    )
  }
}

export default Player
