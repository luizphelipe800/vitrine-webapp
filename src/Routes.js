import { isAuthenticated } from './services/Auth';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import EditShopsPage from './pages/EditShops';
import RemoveShopsPage from './pages/RemoveShops';
import CreateShopsPage from './pages/CreateShops';
import DetailsShopsPage from './pages/DetailsShops';
import EditUsersPage from './pages/EditUsers';

const PublicRoutes = ({ children, ...rest }) => {
    return <Route
        { ...rest }
        render={({ location }) => (
            !isAuthenticated() ? (
                children
            ) : (
                <Redirect to={{ pathname: '/home', state: { from: location } }}/>
            ) 
        )}
    />
}
const PrivateRoutes = ({ children, ...rest }) => {
    return <Route
        { ...rest }
        render={({ location }) => (
            isAuthenticated() ? (
                children
            ) : (
                <Redirect to={{ pathname: '/', state: { from: location } }}/>
            )
        )}
    />
}

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoutes  exact path="/">
        <LoginPage/>
      </PublicRoutes>

      <PublicRoutes path="/register">
        <RegisterPage/>
      </PublicRoutes>
      
      <PrivateRoutes path="/home">
        <HomePage/>
      </PrivateRoutes>

      <PrivateRoutes path="/profile">
        <ProfilePage/>
      </PrivateRoutes>

      <PrivateRoutes path="/shops/edit/:id">
        <EditShopsPage/>
      </PrivateRoutes>

      <PrivateRoutes path="/shops/remove/:id">
        <RemoveShopsPage/>
      </PrivateRoutes>

      <PrivateRoutes path="/shops/details/:id">
        <DetailsShopsPage/>
      </PrivateRoutes>

      <PrivateRoutes path="/shops/create">
        <CreateShopsPage/>
      </PrivateRoutes>

      <PrivateRoutes path="/users/edit">
        <EditUsersPage/>
      </PrivateRoutes>
    </Switch>
  </BrowserRouter>
)

export default Routes;