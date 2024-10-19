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

class Home extends Component {
  state = {editorsPicksData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getEditorsPickData()
  }

  getEditorsPickData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
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
      const upatedData = data.playlists.items.map(item => ({
        id: item.id,
        name: item.name,
        images: item.images,
      }))
      this.setState({
        editorsPicksData: upatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderEditorsPicksList = () => {
    const {editorsPicksData} = this.state
    return (
      <div>
        <h1>Editor&apos;s picks</h1>
        <div>
          {editorsPicksData.map(item => (
            <EditorsPicks editorsPicksData={item} key={item.id} />
          ))}
        </div>
      </div>
    )
  }

  renderLoadingView = () => <LoaderView />

  renderFailureView = () => <FailureView />

  renderHomeView = () => {
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
      <>
        <div>
          <h1>Home Page</h1>
          <div>{this.renderHomeView()}</div>
        </div>
      </>
    )
  }
}

export default Home
