import { logout } from '../services/Auth';
import { Link, useHistory } from 'react-router-dom';
import Fetcher from '../utils/Fetcher';
import useSWR from 'swr';

const NavBar = () => {
  const { data:user, error } = useSWR('/users', Fetcher);
  const history = useHistory();

  const handleOnLogoutClick = () => {
    logout()
    .then(() => history.replace('/login'))
    .catch(err => console.log(err));
}

  if(!user) return <p>Loading...</p>
  if(error) return <p>Algum erro Aconteceu!</p>

  return (
    <div>
      <h1>Vitrine</h1>
      <ul>
        <li><Link to="/profile">{ user.name }</Link></li>
        <li><button onClick={handleOnLogoutClick}>Sair</button></li>
      </ul>
    </div>
  )
}

export default NavBar;