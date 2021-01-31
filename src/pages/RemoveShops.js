import { useParams, useHistory } from 'react-router-dom';
import { useState } from 'react';
import Api from '../services/Api';

//components
import NavBar from '../components/NavBar';

const RemoveShops = () => {
  const { id } = useParams();
  const history = useHistory();
  const [ error, setError ] = useState('');

  const handleOnConfirmBtnClick = async () => {
    try{
      await Api.delete(`/shops/${id}`);
      history.replace('/home');

    }catch(err){
      const { message } = err.response.data;
      return setError(message);
    }
  }

  const handleOnCancelBtnClick = () => {
    history.replace('/home');
  }

  return (
    <div>
      <NavBar/>
      <div className="w-screen flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold text-gray-900 my-8">Para Excluir sua loja, clique em confimar!</h1>
        <div className="w-full md:w-6/12 flex flex-row justify-between">
          <button 
            onClick={handleOnConfirmBtnClick}
            className="py-2 px-4 bg-red-500 text-white shadow-md rounded"
          >
            Confirmar
          </button>
          <button 
            onClick={handleOnCancelBtnClick}
            className="py-2 px-4 bg-gray-200 text-gray-900 shadow-md rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default RemoveShops;