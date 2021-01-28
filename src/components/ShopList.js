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
      { error && <p>Ocorreu um erro</p> }
      <h2>Lojas</h2>
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
              <Link to={`shops/edit/${shop.id}`}>editar</Link>
              <Link to={`shops/remove/${shop.id}`}>apagar</Link>
            </div>
          }
          <Link to={`shops/details/${shop.id}`}>detalhes</Link>
        </div>
        ))
      }
    </div>
  )
}

export default ShopList;