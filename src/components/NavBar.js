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
    <div className="
      flex 
      md:flex-row 
      md:justify-between 
      md:items-center 
      p-10
    ">
      <Link to="/home" className="text-3xl font-bold">
        <h1>Vitrine</h1>
      </Link>
      <div>
        <strong>{ user.active || 'Usuario precisa ser Ativado!' }</strong>
      </div>
      <ul className="flex flex-row justify-between items-center">
        <li><Link to="/shops/create">Nova Loja</Link></li>
        <li className="md:ml-5 sm:ml-2"><Link to="/profile">{ user.name }</Link></li>
        <li className="md:ml-5 sm:ml-2"><button onClick={handleOnLogoutClick}>Sair</button></li>
      </ul>
    </div>
  )
}

export default NavBar;