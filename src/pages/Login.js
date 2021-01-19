import SetLocalStorage from '../utils/SetLocalStorage';
import GetLocalStorage from '../utils/GetLocalStorage';

const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => SetLocalStorage('@token123', '123321dsd', 2)}>Login</button>
            <button onClick={() => console.log(GetLocalStorage('@token'))}>GetLocalStorage</button>
            
        </div>
    )
}

export default Login;