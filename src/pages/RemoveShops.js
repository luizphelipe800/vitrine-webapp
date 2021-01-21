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
      <h1>Para Excluir sua loja, clique em confimar!</h1>
      <button onClick={handleOnConfirmBtnClick}>Confirmar</button>
      <button onClick={handleOnCancelBtnClick}>Cancelar</button>
    </div>
  )
}

export default RemoveShops;