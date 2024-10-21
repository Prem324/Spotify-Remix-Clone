import {Component} from 'react'
import Cookies from 'js-cookie'

class GenreMoodPlaylist extends Component {
  componentDidMount = () => {
    this.getSpecificGenreDetails()
  }

  getSpecificGenreDetails = async () => {
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {playlistId} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis2.ccbp.in/spotify-clone/category-playlists/${playlistId}`
    const options = {
      method: 'GET',
      headers: {
        Authorozation: `Bearer ${jwtToken}`,
      },
    }
    const reponse = await fetch(apiUrl, options)
    console.log(reponse)
  }

  render() {
    return (
      <div>
        <h1>Category List</h1>
      </div>
    )
  }
}

export default GenreMoodPlaylist
