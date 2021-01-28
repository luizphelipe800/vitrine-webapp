import useSWR, { mutate } from 'swr';
import Fetcher from '../utils/Fetcher';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../services/Auth';

//components
import NavBar from '../components/NavBar';
import ImageGalery from '../components/ImageGalery';
import Api from '../services/Api';

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
      <h1>{ currentShop.shop.name }</h1>
      <p>{ currentShop.shop.address }</p>
      <div>
        <h3>shop</h3>
        { 
          currentShop.shop.userId === getUser().id &&
          <div>
            <div>
              <
                input type="file"
                accept="image/*"
                onChange={ev => {
                  setImage(ev.target.files[0]);
                  setImageUrl(URL.createObjectURL(ev.target.files[0]));
                }}
              />
              { imageUrl && <img src={imageUrl} alt="imagem a ser inserida"/>}
            </div>

            <button onClick={handleOnSaveBtnClick}>Salvar</button>
          </div>
        }
        <ImageGalery images={ currentShop.shopimages }/>
      </div>
    </div>
  )
}

export default DetailsShops;