import React from "react";
import { Route, Routes } from "react-router-dom";
import AppHeader from "../components/common/AppHeader";
import Home from "../components/home/Home";
import Login from "../components/user/login/Login";
import Signup from "../components/user/signup/Signup";
import Profile from "../components/user/profile/Profile";
import OAuth2RedirectHandler from "../components/user/oauth2/OAuth2RedirectHandler";
import NotFound from "../components/common/NotFound";
import PrivateRoute from "../components/common/PrivateRoute";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { AuthProvider } from "../context/AuthContext";
import Chat from "../components/chat/Chat";
import Verify from "../components/user/verify/Verify";
import ImageUploader from "../components/image/ImageUploader";
import { AxiosInterceptor } from "../api/AuthApi";
import Character from "../components/character/Character";

function App() {
  return (
    <AuthProvider>
      <AxiosInterceptor>
        <div className="app">
          <AppHeader />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/profile"
              element={<PrivateRoute child={<Profile />} />}
            />
            <Route path="/chat" element={<PrivateRoute child={<Chat />} />} />
            <Route
              path="/profile/upload/image"
              element={<PrivateRoute child={<ImageUploader />} />}
            />
            <Route
              path="/character"
              element={<PrivateRoute child={<Character />} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/oauth2/redirect"
              element={<OAuth2RedirectHandler />}
            />
            <Route path="/user/verify" element={<Verify />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </AxiosInterceptor>
    </AuthProvider>
  );
}

export default App;
