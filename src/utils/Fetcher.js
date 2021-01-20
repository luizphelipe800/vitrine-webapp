import Api from '../services/Api';

const Fetcher = async uri => {
  try{
    const { data } = await Api.get(uri);
    return data;
  }catch(err){
    return err;
  }
}

export default Fetcher;