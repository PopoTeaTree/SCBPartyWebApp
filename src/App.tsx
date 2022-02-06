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
  let deA = isLogin === 'true' ? true : false;
  console.log(deA);
  return deA ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  return (
    // Path router
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
