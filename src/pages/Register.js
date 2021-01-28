import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Api from '../services/Api';

const Register = () => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ rePassword, setRePassword ] = useState('');
  const [ error, setError ] = useState(null);
  const history = useHistory();

  const setPasswordVisible = id => {
    const el = document.getElementById(id);
    el.type = el.type === 'password' ? 'text' : 'password';
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
    <div>
      <p>{ error || '' }</p>
      <h1>Cadastro Grátis</h1>
      <form onSubmit={handleOnSubmit}>
        <div>
          <input 
            type="text"
            onChange={ev => setName(ev.target.value)}
            value={name}
          />
        </div>

        <div>
          <input 
            type="email"
            onChange={ev => setEmail(ev.target.value)}
            value={email}
          />
        </div>

        <div>
          <input 
            type="password"
            id="password"
            onChange={ev => setPassword(ev.target.value)}
            value={password}
          />
          <button 
            type="button"
            onClick={() => setPasswordVisible('password')}
          >
            show
          </button>
        </div>

        <div>
          <input 
            type="password"
            id="repassword"
            onChange={ev => setRePassword(ev.target.value)}
            value={rePassword}
          />
          <button 
            type="button"
            onClick={() => setPasswordVisible('repassword')}
          >
            show
          </button>
        </div>

        <button type="submit">Registrar</button>
      </form>
      <Link to="/login">Voltar e fazer login</Link>
    </div>
  )
}

export default Register;