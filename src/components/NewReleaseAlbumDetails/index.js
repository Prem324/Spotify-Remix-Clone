import {Component} from 'react'
import Cookies from 'js-cookie'
import BackNavigation from '../BackNavigation'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import Navbar from '../Navbar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITAIL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class NewReleaseAlbumDetails extends Component {
  state = {
    musicList: [],
    displayInfo: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getAlbumDetailsData()
  }

  getAlbumDetailsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {playlistId} = params

    const jwtToken = Cookies.get('jwt_token')
    const albumDetailsApiUrl = `https://apis2.ccbp.in/spotify-clone/album-details/${playlistId}`
    const albumDetailsOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const albumDetailsReponse = await fetch(
      albumDetailsApiUrl,
      albumDetailsOptions,
    )

    if (albumDetailsReponse.ok) {
      const albumDetailsData = await albumDetailsReponse.json()
      console.log(albumDetailsData)

      const updatedAlbumDetailsInfo = {
        albumType: albumDetailsData.album_type,
        artists: albumDetailsData.artists,
        availableMarkets: albumDetailsData.available_markets,
        copyrights: albumDetailsData.copyrights,
        externalIds: albumDetailsData.external_ids,
        externalUrls: albumDetailsData.externalUrls,
        genres: albumDetailsData.genres,
        href: albumDetailsData.href,
        id: albumDetailsData.id,
        images: albumDetailsData.images,
        label: albumDetailsData.label,
        name: albumDetailsData.name,
        popularity: albumDetailsData.popularity,
        releaseDate: albumDetailsData.release_date,
        releaseDatePrecision: albumDetailsData.release_date_precision,
        totalTracks: albumDetailsData.total_tracks,
        tracks: albumDetailsData.tracks,
        type: albumDetailsData.type,
        uri: albumDetailsData.uri,
      }

      const updatedAlbumTracksData = albumDetailsData.tracks.items.map(
        item => ({
          artists: item.artists,
          availableMarkets: item.available_markets,
          discNumber: item.disc_number,
          durationMs: item.duration_ms,
          episode: item.episode,
          explicit: item.explicit,
          externalUrls: item.external_urls,
          href: item.href,
          id: item.id,
          isLocal: item.is_local,
          name: item.name,
          popularity: item.popularity,
          previewUrl: item.preview_url,
          trackNumber: item.track_number,
          type: item.type,
          uri: item.uri,
        }),
      )
      this.setState({
        musicList: updatedAlbumTracksData,
        displayInfo: updatedAlbumDetailsInfo,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderAlbumDetailsSection = () => <h1>Player</h1>

  renderAlbumDetails = () => (
    <div>
      <BackNavigation />
      {this.renderAlbumDetailsSection()}
    </div>
  )

  onTryAgain = () => {
    this.getAlbumDetailsData()
  }

  renderFailureView = () => <FailureView onTryAgain={this.onTryAgain} />

  renderLoadingView = () => <LoaderView />

  renderApiStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAlbumDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="album-details-responsive-container">
        <Navbar />
        <div className="album-details-container">
          {this.renderApiStatusView()}
        </div>
      </div>
    )
  }
}

export default NewReleaseAlbumDetails
