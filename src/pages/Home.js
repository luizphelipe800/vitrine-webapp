import { logout } from '../services/Auth';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();

    const handleOnLogoutClick = () => {
        logout()
        .then(() => history.replace('/login'))
        .catch(err => console.log(err));
    }

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleOnLogoutClick}>Sair</button>
        </div>
    )
}

export default Home;