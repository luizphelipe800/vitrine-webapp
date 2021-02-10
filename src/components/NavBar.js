import { logout } from '../services/Auth';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import Fetcher from '../utils/Fetcher';
import useSWR from 'swr';

//icons
import { FaChevronDown } from 'react-icons/fa'

const NavBar = () => {
  const { data:user, error } = useSWR('/users', Fetcher);
  const [ menuHidden, setMenuHidden ] = useState(true);
  const history = useHistory();

  const handleOnLogoutClick = () => {
    logout()
    .then(() => history.replace('/'))
    .catch(err => console.log(err));
}

  if(!user) return <p>Loading...</p>
  if(error) return <p>Algum erro Aconteceu!</p>

  return (
    <div className="
      flex 
      flex-row 
      justify-between 
      items-center 
      p-10
    ">
      <Link to="/home" className="text-3xl font-bold text-gray-900">
        <h1>Vitrine</h1>
      </Link>
      <div>
        <strong>{ user.active || 'Usuario precisa ser Ativado!' }</strong>
      </div>
      <ul className="md:flex flex-row justify-between items-center hidden">
        <li><Link to="/shops/create">Nova Loja</Link></li>
        <li className="md:ml-5 sm:ml-2"><Link to="/profile">{ user.name }</Link></li>
        <li className="md:ml-5 sm:ml-2"><button onClick={handleOnLogoutClick}>Sair</button></li>
      </ul>
      <div className="inline-flex relative md:hidden">
        <div 
          className="z-10" 
          aria-haspopup="true" 
          aria-expanded="true"
          onClick={() => menuHidden ? setMenuHidden(false) : setMenuHidden(true)}
        >
          <FaChevronDown/>
        </div>

        <div className={`transition-all duration-500 ease-in-out origin-top-right absolute right-0 top-2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${ menuHidden ? 'hidden' : 'block'}`}>
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <Link to="/shops/create" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Nova Loja</Link>
            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">{ user.name }</Link>
            <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
              <button onClick={handleOnLogoutClick}>Sair</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar;