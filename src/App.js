import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
import CreateBlog from './screens/CreateBlog';
import Login from './screens/Login';
import Home from './screens/Home';
import { signOut } from 'firebase/auth'
import { auth } from './firebaseConfig';

function App() {

  const [authenticated, setAuthenticated] = useState(false) 

  const logout = () => {
      signOut(auth).then(() => {
        localStorage.clear();
        setAuthenticated(false)
        window.location.pathname = "/login"  //don't use navigate here // we are outside of router lol

      })
  }
  return (
     <Router>
      <nav>
        
        
        {!authenticated
         ? <Link to="/login">Login</Link> 
        :<>
        <Link to="/">Home</Link>
        <Link to="/CreateBlog">CreateBlog</Link> 
        <button onClick={logout} className='logout-btn'>Logout</button></> }  
      </nav>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/CreateBlog' element={<CreateBlog authenticated={authenticated} />}></Route>
       <Route path='/login' element={<Login setAuthenticated={setAuthenticated} />}></Route>
        
      </Routes>
     </Router>
  );
}

export default App;
