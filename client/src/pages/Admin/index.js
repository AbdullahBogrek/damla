import { Link, Outlet } from "react-router-dom";
import React from 'react'

import "./admin.css"

function Admin() {
    return (

        <div className="container">
            <nav className="admin-header d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2 my-3 border-bottom shadow p-3 bg-body rounded">
                <ul className="nav col-12 col-md-auto">
                    <li>
                        <Link to="/admin" class="nav-link text-primary">
                            <i class="fa-solid fa-gauge me-1 d-none d-sm-inline"></i> Panel
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/talepler" class="nav-link text-danger">
                            <i class="fa-solid fa-hand-holding-medical me-1 d-none d-sm-inline"></i> Talepler
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/imkanlar" class="nav-link text-success">
                            <i class="fa-solid fa-hand-holding-hand me-1 d-none d-sm-inline"></i> İmkanlar
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/kullanici" class="nav-link text-warning">
                            <i class="fa-solid fa-user-group me-1 d-none d-sm-inline"></i> Kullanıcılar
                        </Link>
                    </li>
                </ul>
            </nav>
            <section className="mb-2 border-bottom shadow pt-4 px-4 mb-5 bg-body rounded vh-100">
                <Outlet />
            </section>
        </div>

    )
}

export default Admin