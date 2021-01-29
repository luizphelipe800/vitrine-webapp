import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Api from '../services/Api';

//icons
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Register = () => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ rePassword, setRePassword ] = useState('');
  const [ error, setError ] = useState(null);
  const [ isVisible, setIsVisible ] = useState(false);
  const [ isVisible2, setIsVisible2 ] = useState(false);
  const history = useHistory();

  const setPasswordVisible = id => {
    const el = document.getElementById(id);
    el.type = el.type === 'password' ? 'text' : 'password';
    if(id === 'password'){
      el.type === 'password' ? setIsVisible(false) : setIsVisible(true);
    }else{
      el.type === 'repassword' ? setIsVisible2(false) : setIsVisible2(true);
    }
  }

  const comparePasswords = (password1, password2) => password1 === password2;

  const handleOnSubmit = async ev => {
    ev.preventDefault();

    try{
      if(comparePasswords(password, rePassword)){
        await Api.post('/register', { name, email, password });
        history.replace('/login');
      }

      return setError('senha diferentes');
    }catch(err){
      const { message } = err.response.data;
      return setError(message)
    }
  }

  return (
    <div className="h-screen w-full container flex flex-col justify-center items-center bg-yellow-500">
      <p>{ error || '' }</p>
      <h1 className="font-bold text-6xl text-gray-900 mb-6">Vitrine</h1>
      <h1 className="font-thin text-2xl">Cadastro Grátis</h1>
      <form onSubmit={handleOnSubmit} className="flex flex-col">
        <div className="flex flex-col mb-3">
          <label htmlFor="nome">Nome</label>
          <input 
            type="text"
            id="nome"
            onChange={ev => setName(ev.target.value)}
            className="border border-gray-200 p-2 outline-none mb-3 focus:border-yellow-300 focus:shadow-md"
            required
            value={name}
          />
        </div>

        <div className="flex flex-col mb-3">
          <label htmlFor="email">Email</label>
          <input 
            type="email"
            id="email"
            onChange={ev => setEmail(ev.target.value)}
            className="border border-gray-200 p-2 outline-none mb-3 focus:border-yellow-300 focus:shadow-md"
            required
            value={email}
          />
        </div>

        <div className="flex flex-col mb-3">
          <label htmlFor="password">Senha</label>
          <div className="flex justify-center items-center">
            <input 
              type="password"
              id="password"
              onChange={ev => setPassword(ev.target.value)}
              className="border border-gray-200 p-2 outline-none focus:border-yellow-300 focus:shadow-md"
              required
              value={password}
            />
            <button 
              className="bg-gray-900 text-white p-3 rounded-r-md"
              type="button"
              onClick={() => setPasswordVisible('password')}
            >
              { !isVisible ? <AiFillEye/> : <AiFillEyeInvisible/> }
            </button>
          </div>
        </div>

        <div className="flex flex-col mb-3">
          <label htmlFor="repassword">Repita a Senha</label>
          <div className="flex justify-center items-center">
            <input 
              type="password"
              id="repassword"
              onChange={ev => setRePassword(ev.target.value)}
              className="border border-gray-200 p-2 outline-none focus:border-yellow-300 focus:shadow-md"
              value={rePassword}
            />
            <button 
              className="bg-gray-900 text-white p-3 rounded-r-md"
              type="button"
              onClick={() => setPasswordVisible('repassword')}
            >
              { !isVisible2 ? <AiFillEye/> : <AiFillEyeInvisible/> }
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          className="self-center my-6 bg-gray-900 text-white py-2 px-4 rounded shadow-md"
        >
          Registrar
        </button>
      </form>
      <Link to="/login">Voltar e fazer login</Link>
    </div>
  )
}

export default Register;