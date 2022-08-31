import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


import Home from '../components/Home/Home'
import About from '../components/About/index'
import SignIn from '../components/SignIn/index'
import SignUp from '../components/SignUp/index'
import Map from '../components/Map/index'
import Profile from '../components/Profile/index'
import Settings from '../components/Settings/index'
import NotFound from '../components/NotFound/index'

export default class App extends Component {

    render() {

        return (

          <Router>

            <Routes>

              <Route exact component={Home} path="/" />

              <Route exact component={SignIn} path="/giriş" />

              <Route exact component={SignUp} path="/kayıt" />

              <Route exact component={About} path="/hakkında" />

              <Route exact component={Map} path="/harita" />

              <Route exact component={Profile} path="/profil" />

              <Route exact component={Settings} path="/ayarlar" />

              <Route exact component={NotFound} path="/hata" />

            </Routes>

          </Router>
          
        )

    }

}