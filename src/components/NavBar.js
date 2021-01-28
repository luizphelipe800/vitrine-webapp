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
      <Link to="/home"><h1>Vitrine</h1></Link>
      <div>
        <strong>{ user.active || 'Usuario precisa ser Ativado!' }</strong>
      </div>
      <ul>
        <li><Link to="/shops/create">Nova Loja</Link></li>
        <li><Link to="/profile">{ user.name }</Link></li>
        <li><button onClick={handleOnLogoutClick}>Sair</button></li>
      </ul>
    </div>
  )
}

export default NavBar;