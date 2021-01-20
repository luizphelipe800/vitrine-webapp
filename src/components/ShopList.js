import Fetcher from '../utils/Fetcher';
import useSWR from 'swr';
import { getUser } from '../services/Auth';
import { Link } from 'react-router-dom';

const ShopList = props => {
  const query = props.uid ? `?uid=${props.uid}` : '';
  const { data:shops, error } = useSWR(`/shops${query}`, Fetcher);

  if(!shops) return <p>Loading...</p>

  return (
    <div>
      <h2>Shops</h2>
      {
        shops.map(shop => (
        <div key={shop.id}>
          <h2>{ shop.name }</h2>
          <p>{ shop.address }</p>
          <p>{ shop.user.name }</p>
          <p>{ shop.user.email }</p>
          {
            getUser().id === shop.userId &&
            <div>
              <Link>Edit</Link>
              <Link>Remove</Link>
            </div>
          }
        </div>
        ))
      }
    </div>
  )
}

export default ShopList;