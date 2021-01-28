import NavBar from '../components/NavBar';
import ShopList from '../components/ShopList';
import { Link } from 'react-router-dom';
import { getUser } from '../services/Auth';

const Profile = () => {

  return (
    <div>
      <NavBar/>
      <Link to="/users/edit">Edit your infos</Link>
      <div>
        <h2>Your Shops</h2>
        <ShopList uid={getUser().id}/>
      </div>
    </div>
  )
}

export default Profile;