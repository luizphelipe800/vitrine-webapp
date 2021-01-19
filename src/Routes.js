import { isAuthenticated } from './services/Auth';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import LoginPage from './pages/Login';
import HomePage from './pages/Home';

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
            <PrivateRoutes path="/home">
                <HomePage/>
            </PrivateRoutes>
        </Switch>
    </BrowserRouter>
)

export default Routes;