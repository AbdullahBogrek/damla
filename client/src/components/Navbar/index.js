import React from "react";
import { Link } from "react-router-dom";

import './Navbar.css'

import { useAuth } from "../../contexts/AuthContext"
import { useFavorite } from "../../contexts/FavoriteContext"

function Navbar() {
    const { loggedIn, logout, user } = useAuth()
    const { items } = useFavorite()

    const handleLogout = async () => {
        logout()
    }
     
    return (
        <nav className="navbar navbar-expand-lg shadow-sm bg-white rounded">
            <div className="container">
                <Link to="/" className="navbar-brand" component="">
                    Damla
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">

                    { !loggedIn && (
                        <div className="navbar-nav center">
                            <Link to="/" className="me-2 ps-2 menu nav-link" aria-current="page">Anasayfa</Link>
                            <Link to="/giris" className="me-2 ps-2 menu nav-link">Giriş</Link>
                            <Link to="/kayit" className="signup-btn ps-2 nav-link">Kayıt ol</Link>
                        </div>
                    )}

                    { loggedIn && (
                        <div className="navbar-nav center">
                            
                            {
                                user?.role === "admin" && (
                                    <>
                                        <Link to="/admin" className="me-2 ps-2 admin-btn text-white bg-dark nav-link">Admin</Link>
                                        <li className="nav-item dropdown">
                                            <a className="me-2 ps-2 menu-btn nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/#" role="button" aria-expanded="false">Menü</a>
                                            <ul className="dropdown-menu">
                                                <Link to="/" className="dropdownMenu ps-3 nav-link" aria-current="page"><i className="fa-solid fa-house me-2"></i> Anasayfa</Link>
                                                <Link to="/harita" className="dropdownMenu ps-3 pb-3 nav-link"><i className="fa-solid fa-map-location-dot me-2"></i> Harita</Link>
                                                <li><hr className="dropdown-divider m-0"/></li>
                                                <Link to="/" className="dropdownMenu ps-3 pt-3 nav-link" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket me-2"></i> Çıkış</Link>
                                            </ul>
                                        </li>
                                    </>
                                )
                            }

                            {
                                user?.role === "user" && (
                                    <>
                                        <Link to="/" className="me-2 ps-2 menu nav-link" aria-current="page">Anasayfa</Link>
                                        <Link to="/harita" className="map-btn me-2 ps-2 nav-link">Harita</Link>
                                        <li className="nav-item dropdown">
                                            <a className="me-2 ps-2 nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/#" role="button" aria-expanded="false">Hesap</a>
                                            <ul className="dropdown-menu">
                                                <Link to="/profil" className="ps-3 dropdownMenu nav-link">Profil</Link>
                                                <Link to="/favoriler" className="ps-3 dropdownMenu nav-link">Favoriler ({items.length})</Link>
                                                <Link to="/ayarlar" className="ps-3 dropdownMenu nav-link">Ayarlar</Link>
                                                <li><hr className="dropdown-divider"/></li>
                                                <Link to="/" className="ps-3 dropdownMenu nav-link" onClick={handleLogout}>Çıkış</Link>
                                            </ul>
                                        </li>
                                    </>
                                )
                            }

                        </div>
                    )}

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
