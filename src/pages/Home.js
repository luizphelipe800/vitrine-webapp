import { logout } from '../services/Auth';

const Home = () => (
    <div>
        <h1>Home</h1>
        <button onClick={logout}>Logout</button>
    </div>
)

export default Home;