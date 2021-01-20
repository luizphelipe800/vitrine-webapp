import Api from '../services/Api';
import { login } from '../services/Auth';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getToken } from '../services/Auth';

const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState(null);
  const history = useHistory();

  const handleOnSubmit = async ev => {
    ev.preventDefault();
    try{
      const { data } = await Api.post('/login', { email, password });
      const { token } = data;
      await login(token);
      history.replace('/home');

    }catch(err){
      const { message } = err.response.data;
      setError(message);
    }
  }

  return (
    <div>
      <p>{ error === null ? '' : error }</p>
      <h1>Login</h1>
      <form onSubmit={handleOnSubmit}>
        <input 
          type="email" 
          name="email" 
          id="email"
          onChange={ev => setEmail(ev.target.value)}
          value={email}
        />
        <input 
          type="password" 
          name="password" 
          id="password"
          onChange={ev => setPassword(ev.target.value)}
          value={password}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;