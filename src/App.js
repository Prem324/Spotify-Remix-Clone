import {Switch, Route, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import FeaturedPlaylistDetails from './components/FeaturedPlaylistDetails'
import CategoryPlaylists from './components/CategoryPlaylists'
import NewReleaseAlbumDetails from './components/NewReleaseAlbumDetails'

import NotFound from './components/NotFound'

import './App.css'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/playlists-details/:playlistId"
      component={FeaturedPlaylistDetails}
    />
    <ProtectedRoute
      exact
      path="/category-playlists/:playlistId"
      component={CategoryPlaylists}
    />
    <ProtectedRoute
      exact
      path="/album-details/:playlistId"
      component={NewReleaseAlbumDetails}
    />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
