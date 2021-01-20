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
import ProfileHome from './pages/Profile';

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
                <Redirect to={{ pathname: '/login', state: { from: location } }}/>
            )
        )}
    />
}

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoutes path="/login">
        <LoginPage/>
      </PublicRoutes>

      <PublicRoutes path="/register">
        <RegisterPage/>
      </PublicRoutes>
      
      <PrivateRoutes path="/home">
        <HomePage/>
      </PrivateRoutes>

      <PrivateRoutes path="/profile">
        <ProfileHome/>
      </PrivateRoutes>
    </Switch>
  </BrowserRouter>
)

export default Routes;