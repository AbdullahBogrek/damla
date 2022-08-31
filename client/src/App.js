import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import Profile from './pages/Profile';
import HelpDetail from './pages/HelpDetail';
import Favorite from './pages/Favorite';
import Settings from './pages/Settings';
import Map from './pages/Map';
import ProtectedRoute from './pages/ProtectedRoute';
import Error404 from './pages/Error404';
import Panel from "./pages/Admin/Panel"
import Talep from "./pages/Admin/Talep"
import Imkan from "./pages/Admin/Imkan"
import Kullanici from "./pages/Admin/Kullanici"
export default function App() {
  return (
    <Router>
      <div>

        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/giris" element={<Signin />} />
          <Route path="/kayit" element={<Signup />} />
          <Route path='/profil' element={<ProtectedRoute/>}>
            <Route path='/profil' element={<Profile/>}/>
          </Route>
          <Route path='/yardim/:help_id' element={<HelpDetail/>}/>
          <Route path='/favoriler' element={<Favorite/>}/>
          <Route path='/ayarlar' element={<ProtectedRoute/>}>
            <Route path='/ayarlar' element={<Settings/>}/>
          </Route>
          <Route path='/harita' element={<ProtectedRoute/>}>
            <Route path='/harita' element={<Map/>}/>
          </Route>
          <Route path='/admin/*' element={<ProtectedRoute/>} admin={true}>
            <Route path='/admin/*' element={<Panel/>}/>
            <Route path="talepler" element={<Talep />}/>
            <Route path="imkanlar" element={<Imkan />}/>
            <Route path="kullanici" element={<Kullanici />}/>
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
        
      </div>
    </Router>
  );
}