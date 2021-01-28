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
      <h1>Edit your profile</h1>
      <form onSubmit={handleOnSubmit}>
        <div>
          <input 
            type="text"
            onChange={ev => setName(ev.target.value)}
            value={name}
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default EditUsers;