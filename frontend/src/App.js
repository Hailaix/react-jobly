import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import './App.css';

import Home from './Home';
import NavBar from './NavBar';
import Companies from './companies/Companies';
import Jobs from './jobs/Jobs';
import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignUpForm';
import Profile from './Profile';
import Company from './companies/Company';
import loginContext from './loginContext';
import JoblyApi from './api';



function App() {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc");
  //still hard coding the token for now

  JoblyApi.token = token;
  //for now, on initial mount only, grab the user based on static token
  useEffect(() => {
    const getUser = async () => {
      if (token) {
        const { username } = jwt_decode(token);
        setUser(await JoblyApi.getUser(username));
      }
    }
    getUser();
    setIsLoaded(true);
  }, [token])

  //log out of current user
  const logout = () => {
    setToken(null);
    setUser(null);
  }

  //log in to the site
  const login = async (formData) => {
    const token = await JoblyApi.login(formData);
    setToken(token);
  }

  if (!isLoaded) {
    return (<h1>Loading...</h1>);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <loginContext.Provider value={{ user }}>
          <NavBar logout={logout} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='companies' element={<Companies />} />
            <Route path='companies/:handle' element={<Company />} />
            <Route path='jobs' element={<Jobs />} />
            <Route path='profile' element={<Profile />} />
            <Route path='login' element={<LoginForm submit={login} />} />
            <Route path='signup' element={<SignUpForm />} />
          </Routes>
        </loginContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
