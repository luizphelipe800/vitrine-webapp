import Fetcher from '../utils/Fetcher';
import useSWR from 'swr';

//components
import NavBar from '../components/NavBar';

const Home = () => {
    const { data:shops, error } = useSWR('/shops', Fetcher);

    if(!shops) return <strong>Loading...</strong>

    return (
      <div>
        <NavBar/>
        <h1>Home</h1>
        <div>
          <h2>Shops</h2>
          {
            shops.map(shop => (
              <div key={shop.id}>
                <h2>{ shop.name }</h2>
                <p>{ shop.address }</p>
                <p>{ shop.user.name }</p>
                <p>{ shop.user.email }</p>
              </div>
            ))
          }
        </div>
      </div>
    )
}

export default Home;