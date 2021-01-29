import Fetcher from '../utils/Fetcher';
import useSWR from 'swr';
import { getUser } from '../services/Auth';
import { Link } from 'react-router-dom';

//icons
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

const ShopList = props => {
  const query = props.uid ? `?uid=${props.uid}` : '';
  const { data:shops, error } = useSWR(`/shops${query}`, Fetcher);

  if(!shops) return <p>Loading...</p>

  return (
    <div className="p-10 box-content">
      { error && <p>Ocorreu um erro</p> }
      <h2 className="text-2xl">Lojas</h2>
      <div className="grid mt-3 md:grid-cols-3 gap-3">
        {
          shops.map(shop => (
          <div key={shop.name+shop.id} className="p-4 bg-yellow-500 shadow-md rounded text-gray-900">
            <h2 className="text-xl font-bold mb-2">{ shop.name }</h2>
            <p>{ shop.address }</p>
            <p>{ shop.user.name }</p>
            <p>{ shop.user.email }</p>
            {
              getUser().id === shop.userId &&
              <div className="flex justify-between items-center my-3">
                <Link className="bg-white p-2 text-gray-900 rounded shadow-md" to={`shops/edit/${shop.id}`}><AiFillEdit/></Link>
                <Link className="bg-red-500 p-2 text-white rounded shadow-md" to={`shops/remove/${shop.id}`}><AiFillDelete/></Link>
              </div>
            }
            <Link className="font-bold" to={`shops/details/${shop.id}`}>detalhes</Link>
          </div>
          ))
        }
      </div>
    </div>
  )
}

export default ShopList;