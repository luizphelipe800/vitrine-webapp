import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Api from '../services/Api';
import Fetcher from '../utils/Fetcher';

//components
import NavBar from '../components/NavBar';

const EditUsers = () => {
  const [ user, setUser ] = useState(null);
  const [ name, setName ] = useState('');
  const [ error, setError ] = useState(null);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try{
        const data = await Fetcher('/users');
        setError(null);
        setUser(data);
        setName(data.name);
      }catch(err){
        console.log(err);
      }
    })()
  }, []);

  if(!user) return <p>Loading</p>;

  const handleOnSubmit = async ev => {
    ev.preventDefault();
    try{
      await Api.put(`/users/${user.id}`, { name });
      history.replace('/profile');
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div>
      <NavBar/>
      <p>{ error || '' }</p>
      <h1 className="ml-10 text-2xl font-bold text-gray-900">Edite Seu Perfil</h1>
      <div className="flex flex-col px-10">
        <form onSubmit={handleOnSubmit}>
          <div className="flex flex-col  my-3">
            <label htmlFor="nome">Nome</label>
            <input 
              type="text"
              id="nome"
              onChange={ev => setName(ev.target.value)}
              value={name}
              className="border-gray-400 border p-2 focus:border-yellow-500 focus:shadow-md outline-none"
            />
          </div>

          <button 
            type="submit"
            className="py-2 px-3 mt-3 bg-yellow-500 text-gray-900 shadow-md rounded"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditUsers;