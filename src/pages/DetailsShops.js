import useSWR, { mutate } from 'swr';
import Fetcher from '../utils/Fetcher';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../services/Auth';

//components
import NavBar from '../components/NavBar';
import ImageGalery from '../components/ImageGalery';
import Api from '../services/Api';

//icons
import { AiFillFileImage } from 'react-icons/ai';

const DetailsShops = () => {
  const { id } = useParams();
  const { data: currentShop, error } = useSWR(`/shops/${id}`, Fetcher);
  const [ image, setImage ] = useState(null);
  const [ imageUrl, setImageUrl ] = useState(null);

  const handleOnSaveBtnClick = async () => {
    try{
      const form = new FormData();
      form.append('shopImg', image, image.name);

      await Api.post(`/files/${id}`, form);

      mutate(`/shops/${id}`);
    }catch(err){
      console.log(err);
    }
  }

  if(!currentShop) return <p>Loading...</p>

  return (
    <div>
      <NavBar/>
      <h1 className="ml-10 font-bold text-xl">{ currentShop.shop.name }</h1>
      <p className="ml-10">{ currentShop.shop.address }</p>
      <div>
        <h3 className="ml-10 my-3 font-bold">Loja</h3>
        { 
          currentShop.shop.userId === getUser().id &&
          <div className="px-10">
            <div className="border border-gray-300 flex justify-center items-center rounded hover:shadow-lg mb-3">
              <label htmlFor="input-file" className="w-full p-3 cursor-pointer">
                <span className="text-4xl flex items-center justify-center text-gray-300">
                  <div className="h-full">
                    { imageUrl ? (
                      <div className="h-36">
                        <img src={imageUrl} alt="imagem a ser inserida" className="object-cover h-full"/>
                      </div>
                    ):(
                      <AiFillFileImage/> 
                    )}
                  </div>
                </span>
                <input 
                  type="file"
                  id="input-file"
                  accept="image/*"
                  onChange={ev => {
                    if(ev.target.files.length > 0){
                      setImage(ev.target.files[0]);
                      setImageUrl(URL.createObjectURL(ev.target.files[0]));
                    }
                  }}
                  className="sr-only"
                />
              </label>
            </div>

            <button onClick={handleOnSaveBtnClick} className="bg-yellow-500 text-gray-900 py-2 px-4 rounded shadow-md">Salvar</button>
          </div>
        }
        <ImageGalery images={ currentShop.shopimages }/>
      </div>
    </div>
  )
}

export default DetailsShops;