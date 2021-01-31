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
      <h1 className="ml-10 font-bold font-medium">Edite sua Loja</h1>
      <form onSubmit={handleOnSubmit} className="text-gray-800 p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col mb-3"> 
            <label htmlFor="nome">Nome Fantasia</label>
            <input 
              type="text"
              id="nome"
              value={nome}
              onChange={ev => setNome(ev.target.value)}
              className="border-gray-400 border p-2 focus:border-yellow-500 focus:shadow-md outline-none"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="rua">Rua</label>
            <input 
              type="text"
              id="rua"
              value={rua}
              onChange={ev => setRua(ev.target.value)}
              className="border-gray-400 border p-2 focus:border-yellow-500 focus:shadow-md outline-none"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="numero">Numero</label>
            <input 
              type="text"
              id="numero"
              value={numero}
              onChange={ev => setNumero(ev.target.value)}
              className="border-gray-400 border p-2 focus:border-yellow-500 focus:shadow-md outline-none"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="bairro">Bairro</label>
            <input 
              type="text"
              id="bairro"
              value={bairro}
              onChange={ev => setBairro(ev.target.value)}
              className="border-gray-400 border p-2 focus:border-yellow-500 focus:shadow-md outline-none"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="cidade">Cidade</label>
            <input 
              type="text"
              id="cidade"
              value={cidade}
              onChange={ev => setCidade(ev.target.value)}
              className="border-gray-400 border p-2 focus:border-yellow-500 focus:shadow-md outline-none"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="uf">UF</label>
            <input 
              type="text"
              if="uf"
              value={uf}
              onChange={ev => setUf(ev.target.value)}
              className="border-gray-400 border p-2 focus:border-yellow-500 focus:shadow-md outline-none"
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center mt-3">
          <button 
            type="submit" 
            className="py-2 px-3 mt-3 bg-yellow-500 text-gray-900 shadow-md rounded"
          >
            Salvar
          </button>
          <button type="button" onClick={handleOnCancelBtnClick}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}

export default EditShops;