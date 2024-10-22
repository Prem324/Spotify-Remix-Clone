import {Component} from 'react'
import Cookies from 'js-cookie'
import EditorsPicks from '../EditorsPicks'
import FailureView from '../FailureView'
import LoaderView from '../LoaderView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Section1 extends Component {
  state = {
    editorsPicksData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getEditorsPickData()
  }

  getEditorsPickData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
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
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderEditorsPicksList = () => {
    const {editorsPicksData} = this.state
    return (
      <div className="editors-picks-container">
        <ul className="editors-picks-list">
          {editorsPicksData.map(item => (
            <EditorsPicks editorsPicksData={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

  onTryAgain = () => {
    this.getEditorsPickData()
  }

  renderLoadingView = () => <LoaderView />

  renderFailureView = () => <FailureView onTryAgain={this.onTryAgain} />

  renderApiStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderEditorsPicksList()
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
        <h1 className="editors-picks-heading">Editor&apos;s picks</h1>
        {this.renderApiStatusView()}
      </div>
    )
  }
}

export default Section1
