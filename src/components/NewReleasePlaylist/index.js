import {Component} from 'react'
import Cookies from 'js-cookie'
import LoaderView from '../LoaderView'
import SongItem from '../SongItem'
import BackNavigation from '../BackNavigation'

import './index.css'

class NewReleasePlaylist extends Component {
  state = {
    musicList: [],
    displayInfo: {},
    isLoading: true,
  }

  componentDidMount = () => {
    this.getSpecificPlaylist()
  }

  getSpecificPlaylist = async () => {
    const {match} = this.props
    const {params} = match
    const {playlistId} = params

    const jwtToken = Cookies.get('jwt_token')
    const specificPlaylistApiUrl = `https://apis2.ccbp.in/spotify-clone/album-details/${playlistId}`
    const specificPlaylistOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const reponse = await fetch(specificPlaylistApiUrl, specificPlaylistOptions)

    if (reponse.ok) {
      const data = await reponse.json()
      console.log(data)

      const updatedPlaylistInfo = {
        collaborative: data.collaborative,
        description: data.description,
        externalUrls: data.external_urls,
        href: data.href,
        id: data.id,
        images: data.images,
        name: data.name,
        owner: data.owner,
        primaryColor: data.primary_color,
        public: data.public,
        snapshotId: data.snapshot_id,
        tracks: data.tracks,
        type: data.type,
        uri: data.uri,
      }

      const updatedTracksData = data.tracks.items.map(item => ({
        album: item.album,
        artists: item.artists,
        availableMarkets: item.available_markets,
        discNumber: item.disc_number,
        durationMs: item.duration_ms,
        episode: item.episode,
        explicit: item.explicit,
        externalIds: item.external_ids,
        externalUrls: item.external_urls,
        href: item.href,
        id: item.id,
        isLocal: item.is_local,
        name: item.name,
        popularity: item.popularity,
        previewUrl: item.preview_url,
        track: item.track,
        trackNumber: item.track_number,
        type: item.type,
        uri: item.uri,
      }))
      this.setState({
        musicList: updatedTracksData,
        isLoading: false,
        displayInfo: updatedPlaylistInfo,
      })
    }
  }

  render() {
    const {isLoading, musicList, displayInfo} = this.state
    return (
      <div>
        {isLoading ? (
          <LoaderView />
        ) : (
          <>
            <BackNavigation />
            <SongItem
              musicList={musicList}
              displayInfo={displayInfo}
              section="New Releases"
            />
          </>
        )}
      </div>
    )
  }
}

export default NewReleasePlaylist
