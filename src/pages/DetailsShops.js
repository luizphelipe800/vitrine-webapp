import useSWR from 'swr';
import Fetcher from '../utils/Fetcher';
import { useParams } from 'react-router-dom';
import { getUser } from '../services/Auth';

//components
import NavBar from '../components/NavBar';

const DetailsShops = () => {
  const { id } = useParams();
  const { data, error } = useSWR(`/shops/${id}`, Fetcher);

  if(!data) return <p>Loading...</p>

  return (
    <div>
      <NavBar/>
      <h1>{ data.shop.name }</h1>
      <p>{ data.shop.address }</p>
      <div>
        <h3>Images</h3>
        { 
          data.shop.userId === getUser().id ? 
          <button>add a new image</button> : 
          null 
        }
        {
          data.shopimages.map(image => (
            <div key={image.id}>
              <img src={image.url} alt={image.path}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DetailsShops;