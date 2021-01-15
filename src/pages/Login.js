import { login } from '../services/Auth';

const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login;