/**
 *  App.tsx
 *
 *  Main manage application which manage route page 
 *  and check user is already log in.
 *
 *  Created by
 *  Thitiporn Sukpartcharoen 
 *
 *  6 Jan 2022
 */
import './App.css';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import PartyList from './pages/PartyList';
import CreateParty from './pages/CreateParty';
import Register from './pages/Register';

/**
  * Check user has already register.
	* @return page to go
*/
function PrivateOutlet() {
  const isLogin = localStorage.getItem("isLogIn");
  // check user has already log in
  let deA = isLogin === 'true' ? true : false;
  // set refreash sign to login page
  if(!deA) localStorage.setItem("RefreashLogin","true");
  // user can acess other page from login
  return deA ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  return (
    // Path router
    <BrowserRouter key="browser-router">
      <Routes key="route-all-page">
        <Route key="route-home-page" path="/" element={<Login />} />
        <Route key="route-login-page" path="/login" element={<Login />} />
        <Route key="route-register-page" path="/register" element={<Register />} />
        <Route key="route-main-playleist-page" path="/partylist" element={<PrivateOutlet />}>
          <Route key="route-playleist-page" path="" element={<PartyList />} />
        </Route>
        <Route key="route-main-create--page" path="/party/create" element={<PrivateOutlet />}>
          <Route key="route-create--page" path="" element={<CreateParty />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
