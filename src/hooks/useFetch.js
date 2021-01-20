import { useState, useEffect } from 'react';
import Api from '../services/Api';

const useFetch = uri => {
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        Api.get(uri).then(response => {
            setData(response.data);
            setIsLoading(false);
        }).catch(err => {
            setError(err);
            setIsLoading(false);
        });
    }, []);

    return {
        data,
        error,
        isLoading
    }
}

export default useFetch;