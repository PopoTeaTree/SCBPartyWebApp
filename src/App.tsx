import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import PartyList from './pages/PartyList';
import CreateParty from './pages/CreateParty';
import Register from './pages/Register';

function PrivateOutlet() {
  const auth = localStorage.getItem('auth');
  const isLogin = auth === 'true' ? true : false;
  return auth && isLogin? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<PrivateOutlet />}>
          <Route path="" element={<Register />} />
        </Route>
        <Route path="/partylist" element={<PrivateOutlet />}>
          <Route path="" element={<PartyList />} />
        </Route>
        <Route path="/party/create" element={<PrivateOutlet />}>
          <Route path="" element={<CreateParty />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
