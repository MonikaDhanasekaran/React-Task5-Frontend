import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from './Components/AuthComponents/LoginComponent';
import RegisterComponent from './Components/AuthComponents/RegisterComponent';
import ForgotPasswordComponent from './Components/AuthComponents/ForgotPasswordComponent';
import HomeComponent from './Components/HomeComponents/HomeComponent';
import UpdateComponent from './Components/HomeComponents/UpdateComponent';
import UrlComponent from './Components/HomeComponents/urlComponent';

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/signup" element={<RegisterComponent />} />
            <Route path="/forgotpassword" element={<ForgotPasswordComponent />} />
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/update/:dataID" element={<UpdateComponent />} />
            <Route path="/url" element={<UrlComponent />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
