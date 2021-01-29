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
      <h1 className="ml-10 font-bold font-medium">Adicione as informações da loja</h1>
      <form onSubmit={handleOnSubmit} className="text-gray-800 p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
          <div className="flex flex-col mb-3">
            <label htmlFor="nome">Nome Fantasia</label>
            <input 
              type="text"
              id="nome"
              value={nome}
              onChange={ev => setNome(ev.target.value)}
              className="border-gray-200 border p-2 focus:border-yellow-500 focus:shadow-md outline-none"
              required
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="rua">Rua</label>
            <input 
              type="text"
              id="rua"
              value={rua}
              onChange={ev => setRua(ev.target.value)}
              className="border-gray-200 border p-2 focus:border-yellow-500 focus:shadow-md outline-none"
              required
            />
          </div>
          <div className="flex flex-col  mb-3">
            <label htmlFor="numero">Numero</label>
            <input 
              type="text"
              id="numero"
              value={numero}
              onChange={ev => setNumero(ev.target.value)}
              className="border-gray-200 border p-2 focus:border-yellow-500 focus:shadow-md outline-none"
              required
            />
          </div>
          <div className="flex flex-col  mb-3">
            <label htmlFor="bairro">Bairro</label>
            <input 
              type="text"
              id="bairro"
              value={bairro}
              onChange={ev => setBairro(ev.target.value)}
              className="border-gray-200 border p-2 focus:border-yellow-500 focus:shadow-md outline-none"
              required
            />
          </div>
          <div className="flex flex-col  mb-3">
            <label htmlFor="cidade">Cidade</label>
            <input 
              type="text"
              id="cidade"
              value={cidade}
              onChange={ev => setCidade(ev.target.value)}
              className="border-gray-200 border p-2 focus:border-yellow-500 focus:shadow-md outline-none"
              required
            />
          </div>
          <div className="flex flex-col  mb-3">
            <label htmlFor="uf">UF</label>
            <input 
              type="text"
              id="uf"
              value={uf}
              onChange={ev => setUf(ev.target.value)}
              className="w-3/12 border-gray-200 border p-2 focus:border-yellow-500 focus:shadow-md outline-none"
              required
            />
          </div>
        </div>
        <button type="submit" className="py-2 px-3 mt-3 bg-yellow-500 text-white shadow-md rounded">
          Salvar
        </button>
      </form>
    </div>
  )
}

export default CreateShops;