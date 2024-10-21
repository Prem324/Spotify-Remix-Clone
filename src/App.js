import {Switch, Route, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import EditorPickPlaylist from './components/EditorPickPlaylist'
import NewReleasePlaylist from './components/NewReleasePlaylist'
import GenreMoodPlaylist from './components/GenreMoodPlaylist'
import './App.css'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/playlists-details/:playlistId"
      component={EditorPickPlaylist}
    />
    <ProtectedRoute
      exact
      path="/album-details/:playlistId"
      component={NewReleasePlaylist}
    />
    <ProtectedRoute
      exact
      paht="/category-playlists/:playlistId"
      component={GenreMoodPlaylist}
    />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
