export let isAuthenticated = false;

export function login(){
    isAuthenticated = true;
}

export function logout(){
    isAuthenticated = false;
}