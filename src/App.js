import React from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Register from './Pages/Register';
import Login from './Pages/Login';
import SecretPage from './Pages/SecretPage';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<SecretPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
