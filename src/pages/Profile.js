import NavBar from '../components/NavBar';
import ShopList from '../components/ShopList';
import { Link } from 'react-router-dom';
import { getUser } from '../services/Auth';
import { AiOutlineSetting } from 'react-icons/ai';

const Profile = () => {

  return (
    <div>
      <NavBar/>
      <div className="ml-10 mb-3 text-2xl bg-yellow-600 inline-flex p-1 shadow-md rounded text-white">
        <Link to="/users/edit">
          <AiOutlineSetting/>
        </Link>
      </div>
      <div>
        <h2 className="ml-10 text-2xl">Suas Lojas</h2>
        <ShopList uid={getUser().id}/>
      </div>
    </div>
  )
}

export default Profile;