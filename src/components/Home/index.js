import {Component} from 'react'
import Cookies from 'js-cookie'
import EditorsPicks from '../EditorsPicks'
import GenresMoods from '../GenresMoods'
import NewReleases from '../NewReleases'
import FailureView from '../FailureView'
import LoaderView from '../LoaderView'
import Navbar from '../Navbar'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    editorsPicksData: [],
    genresMoodsData: [],
    newReleasesData: [],
    apiStatus: apiStatusConstants.initial,
    isEditorsPicksSectionLoading: true,
    isGenresMoodsSectionLoading: true,
    isNewReleasesSectionLoading: true,
  }

  componentDidMount = () => {
    this.getEditorsPickData()
    this.getGenresMoodsData()
    this.getNewReleasesData()
  }

  getEditorsPickData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
      isEditorsPicksSectionLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis2.ccbp.in/spotify-clone/featured-playlists'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const upatedPlaylistsData = data.playlists.items.map(item => ({
        id: item.id,
        name: item.name,
        images: item.images,
      }))
      this.setState({
        editorsPicksData: upatedPlaylistsData,
        apiStatus: apiStatusConstants.success,
        isEditorsPicksSectionLoading: false,
      })
    } else {
      this.renderFailureView()
    }
  }

  getGenresMoodsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
      isGenresMoodsSectionLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis2.ccbp.in/spotify-clone/categories'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedCategoriesData = data.categories.items.map(item => ({
        id: item.id,
        name: item.name,
        icons: item.icons,
      }))
      this.setState({
        genresMoodsData: updatedCategoriesData,
        apiStatus: apiStatusConstants.success,
        isGenresMoodsSectionLoading: false,
      })
    } else {
      this.renderFailureView()
    }
  }

  getNewReleasesData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
      isNewReleasesSectionLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis2.ccbp.in/spotify-clone/new-releases'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedAlbumsData = data.albums.items.map(item => ({
        id: item.id,
        name: item.name,
        images: item.images,
      }))
      this.setState({
        newReleasesData: updatedAlbumsData,
        apiStatus: apiStatusConstants.success,
        isNewReleasesSectionLoading: false,
      })
    } else {
      this.renderFailureView()
    }
  }

  renderEditorsPicksList = () => {
    const {editorsPicksData} = this.state
    return (
      <div>
        <h1>Editor&apos;s picks</h1>
        <ul>
          {editorsPicksData.map(item => (
            <EditorsPicks editorsPicksData={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderGenresMoodsList = () => {
    const {genresMoodsData} = this.state
    return (
      <div>
        <h1>Genres & Moods</h1>
        <ul>
          {genresMoodsData.map(item => (
            <GenresMoods genresMoodsData={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderNewReleasesList = () => {
    const {newReleasesData} = this.state
    return (
      <div>
        <h1>New Releases</h1>
        <ul>
          {newReleasesData.map(item => (
            <NewReleases newReleasesData={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => <LoaderView />

  renderFailureView = () => <FailureView />

  renderHomeView = () => {
    const {
      isEditorsPicksSectionLoading,
      isGenresMoodsSectionLoading,
      isNewReleasesSectionLoading,
    } = this.state

    return (
      <>
        {isEditorsPicksSectionLoading ? (
          <LoaderView />
        ) : (
          this.renderEditorsPicksList()
        )}
        {isGenresMoodsSectionLoading ? (
          <LoaderView />
        ) : (
          this.renderGenresMoodsList()
        )}
        {isNewReleasesSectionLoading ? (
          <LoaderView />
        ) : (
          this.renderNewReleasesList()
        )}
      </>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomeView()
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
      <div>
        <Navbar />
        <div>
          <h1>Home Page</h1>
          <img
            src="https://res.cloudinary.com/dlakv8a0n/image/upload/v1729151434/SpotifyRemix/music-icon.png"
            alt="website logo"
          />
          <div>{this.renderHomeView()}</div>
        </div>
      </div>
    )
  }
}

export default Home
