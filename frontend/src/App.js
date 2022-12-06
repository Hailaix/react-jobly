import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Home';
import NavBar from './NavBar';
import Companies from './Companies';
import Jobs from './Jobs';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Profile from './Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='companies' element={<Companies />} />
          <Route path='jobs' element={<Jobs />} />
          <Route path='profile' element={<Profile />} />
          <Route path='login' element={<LoginForm />} />
          <Route path='signup' element={<SignUpForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
