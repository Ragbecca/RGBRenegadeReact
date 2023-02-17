import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppHeader from '../components/common/AppHeader';
import Home from '../components/home/Home';
import Login from '../components/user/login/Login';
import Signup from '../components/user/signup/Signup';
import Profile from '../components/user/profile/Profile';
import OAuth2RedirectHandler from '../components/user/oauth2/OAuth2RedirectHandler';
import NotFound from '../components/common/NotFound';
import PrivateRoute from '../components/common/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import './App.css';
import { AuthProvider } from '../context/AuthContext';
import AxiosInterceptors from '../context/AxiosInterceptors';

function App() {
  return (
    <AuthProvider>
      <AxiosInterceptors>
        <div className="app">
          <AppHeader />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path='/profile' element={
              <PrivateRoute child={<Profile />} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
            <Route path='*' element={<NotFound />} />
          </Routes >
          <Toaster />
        </div >
      </AxiosInterceptors>
    </AuthProvider>
  );
}

export default App;