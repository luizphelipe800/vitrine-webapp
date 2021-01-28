import { useState } from "react";
import NavBar from "../components/NavBar";
import { useHistory } from 'react-router-dom';
import Api from "../services/Api";

const CreateShops = () => {
  const [ nome, setNome ] = useState('');
  const [ rua, setRua ] = useState('');
  const [ numero, setNumero ] = useState('');
  const [ bairro, setBairro ] = useState('');
  const [ cidade, setCidade ] = useState('');
  const [ uf, setUf ] = useState('');
  const history = useHistory();

  const handleOnSubmit = async ev => {
    ev.preventDefault();
    const address = `${rua}, ${numero}, ${bairro}, ${cidade}, ${uf}`;

    try{
      await Api.post('/shops', { name:nome, address });
      history.replace('/home');
    }catch(err){
      console.log(Object.entries(err));
    }
  }

  return (
    <div>
      <NavBar/>
      <h1>Adicione as informações da loja</h1>
      <form onSubmit={handleOnSubmit}>
        <div>
          <input 
            type="text"
            value={nome}
            onChange={ev => setNome(ev.target.value)}
          />
        </div>
        <div>
          <input 
            type="text"
            value={rua}
            onChange={ev => setRua(ev.target.value)}
          />
        </div>
        <div>
          <input 
            type="text"
            value={numero}
            onChange={ev => setNumero(ev.target.value)}
          />
        </div>
        <div>
          <input 
            type="text"
            value={bairro}
            onChange={ev => setBairro(ev.target.value)}
          />
        </div>
        <div>
          <input 
            type="text"
            value={cidade}
            onChange={ev => setCidade(ev.target.value)}
          />
        </div>
        <div>
          <input 
            type="text"
            value={uf}
            onChange={ev => setUf(ev.target.value)}
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  )
}

export default CreateShops;