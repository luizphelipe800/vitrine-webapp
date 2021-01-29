//components
import NavBar from '../components/NavBar';
import ShopList from '../components/ShopList';

const Home = () => {

    return (
      <div>
        <NavBar/>
        <h1 className="ml-10 text-10md font-bold">Home</h1>
        <ShopList/>
      </div>
    )
}

export default Home;