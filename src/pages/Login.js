import Api from '../services/Api';
import { login } from '../services/Auth';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState(null);
  const history = useHistory();

  const handleOnSubmit = async ev => {
    ev.preventDefault();
    try{
      const { data } = await Api.post('/login', { email, password });
      const { token, user } = data;
      await login(token, user);
      history.replace('/home');

    }catch(err){
      const { message } = err.response.data;
      setError(message);
    }
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-yellow-500 text-gray-900">
      <p>{ error || null }</p>
      <h1 className="font-bold text-6xl text-gray-900 mb-6">Vitrine</h1>
      <h1 className="font-thin text-2xl">Login</h1>
      <form onSubmit={handleOnSubmit} className="flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email"
            onChange={ev => setEmail(ev.target.value)}
            value={email}
            className="border border-gray-200 p-2 outline-none mb-3 focus:border-yellow-300 focus:shadow-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm">Senha</label>
          <input 
            type="password" 
            name="password" 
            id="password"
            onChange={ev => setPassword(ev.target.value)}
            value={password}
            className="border border-gray-200 p-2 outline-none mb-3 focus:border-yellow-300 focus:shadow-md"
            required
          />
        </div>
        <button type="submit" className="self-center my-3 py-2 px-4 bg-gray-900 text-white shadow-md rounded">Entrar</button>
      </form>
      <Link to="/register">Cadastre Grátis</Link>
    </div>
  )
}

export default Login;