import GetLocalStorage from '../utils/GetLocalStorage';
import SetLocalStorage from '../utils/SetLocalStorage';

const TOKEN = '@token123';

export const isAuthenticated = () => GetLocalStorage(TOKEN) !== null;

export const getToken = () => GetLocalStorage(TOKEN).token;

/**
 * @param {String} token 
 * @returns {Promise}
 */

export const login = token => {
    return new Promise((resolve, reject) => {
        try{
            SetLocalStorage(TOKEN, token, 2);
            return resolve(true);
        }catch{
            return reject(new Error('falha ao salvar token no localStorage'));
        }
    })
}

/**
 * @returns {Promise}
 */

export const logout = () => {
    return new Promise((resolve, reject) => {
        try{
            localStorage.removeItem(TOKEN);
            return resolve(true);
        }catch{
            return reject(new Error('falha ao remover token do localStorage'));
        }
    })
}