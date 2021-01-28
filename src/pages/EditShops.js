import Fetcher from  '../utils/Fetcher';
import Api from '../services/Api';
import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

//components
import NavBar from '../components/NavBar';

const EditShops = () => {
  const { id } = useParams();
  const [ nome, setNome ] = useState('');
  const [ rua, setRua ] = useState('');
  const [ numero, setNumero ] = useState('');
  const [ bairro, setBairro ] = useState('');
  const [ cidade, setCidade ] = useState('');
  const [ uf, setUf ] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const data = await Fetcher(`/shops/${id}`);
      const { shop } = data;
      const address = shop.address.split(',').map(item => item.trim());

      setNome(shop.name);
      setRua(address[0]);
      setNumero(address[1]);
      setBairro(address[2]);
      setCidade(address[3]);
      setUf(address[4]);
      setIsLoading(false);
    })()
  }, [id]);

  const handleOnSubmit = async ev => {
    ev.preventDefault();

    const address = `${rua}, ${numero}, ${bairro}, ${cidade}, ${uf}`;

    try{
      await Api.put(`/shops/${id}`, { name:nome, address });
      history.replace('/home');
    }catch(err){
      console.log(Object.entries(err));
    }
  }

  const handleOnCancelBtnClick = () => {
    history.replace('/home');
  }

  if(isLoading) return <p>loading...</p>

  return (
    <div>
      <NavBar/>
      <h1>Edite sua Loja</h1>
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
        <button type="button" onClick={handleOnCancelBtnClick}>Cancelar</button>
      </form>
    </div>
  )
}

export default EditShops;