import {Component} from 'react'
import Cookies from 'js-cookie'
import GenresMoods from '../GenresMoods'
import FailureView from '../FailureView'
import LoaderView from '../LoaderView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Section2 extends Component {
  state = {
    genresMoodsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getGenresMoodsData()
  }

  getGenresMoodsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
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
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderGenresMoodsList = () => {
    const {genresMoodsData} = this.state
    return (
      <div className="genres-moods-container">
        <ul className="genres-moods-list">
          {genresMoodsData.map(item => (
            <GenresMoods genresMoodsData={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

  onTryAgain = () => {
    this.getGenresMoodsData()
  }

  renderLoadingView = () => <LoaderView />

  renderFailureView = () => <FailureView onTryAgain={this.onTryAgain} />

  renderApiStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGenresMoodsList()
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
        <h1 className="genres-moods-heading">Genres & Moods</h1>
        {this.renderApiStatusView()}
      </div>
    )
  }
}

export default Section2
