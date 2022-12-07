import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import './App.css';

import Home from './Home';
import NavBar from './NavBar';
import Companies from './companies/Companies';
import Jobs from './jobs/Jobs';
import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignUpForm';
import Profile from './forms/Profile';
import Company from './companies/Company';
import loginContext from './loginContext';
import JoblyApi from './api';
import useLocalStorage from './useLocalStorage';



function App() {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  //sets token in local storage under token, as well as in state
  const [token, setToken] = useLocalStorage('token');

  //set the token in the API
  JoblyApi.token = token;

  //Whenever token changes, grab the new user info from the server and put it in state
  useEffect(() => {
    const getUser = async () => {
      //if there is no token, do nothing
      if (token) {
        const { username } = jwt_decode(token);
        setUser(await JoblyApi.getUser(username));
      }
    }
    getUser();
    setIsLoaded(true);
  }, [token])

  //log out of current user by removing token
  const logout = () => {
    setToken(null);
    setUser(null);
  }

  //log in
  const login = async (formData) => {
    const token = await JoblyApi.login(formData);
    setToken(token);
  }

  //sign up
  const signup = async (formData) => {
    const token = await JoblyApi.signup(formData);
    setToken(token);
  }

  //change details of current user
  const editProfile = async (formData) => {
    setUser(await JoblyApi.editUser(user.username, formData));
  }

  if (!isLoaded) {
    return (<h1>Loading...</h1>);
  }

  /**
   * As Route protection, protected Routes will navigate to the login page unless user is present. 
   */
  return (
    <div className="App">
      <BrowserRouter>
        <loginContext.Provider value={{ user }}>
          <NavBar logout={logout} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='login' element={<LoginForm submit={login} />} />
            <Route path='signup' element={<SignUpForm submit={signup} />} />
            <Route path='companies' element={user ? <Companies /> : <Navigate to='/login' />} />
            <Route path='companies/:handle' element={user ? <Company /> : <Navigate to='/login' />} />
            <Route path='jobs' element={user ? <Jobs /> : <Navigate to='/login' />} />
            <Route path='profile' element={user ? <Profile submit={editProfile} /> : <Navigate to='/login' />} />
          </Routes>
        </loginContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
