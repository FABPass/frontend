import React from 'react';
import Logo from "../Logo/Logo";
import {Link} from "react-router-dom";
import {Outlet} from "react-router";
import styles from "./Navbar-module.css"

const WithNav = () => {
    return (
        <div>
            <nav className={`navbar navbar-expand-md navbar-light pt-3 pb-0 ${styles.background}`}>
                <div className="container-lg">
                    <Logo loggedIn={"loggedIn"}/>
                    <span className="navbar-brand text-secondary fw-bold">
                      <i className="bi bi-lock-fill"></i>
                        FABPass
                    </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse justify-content-end align-center" id="main-nav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link className={"nav-link"} to={"/dashboard"}>Dashboard</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to={"/profile"}>Profile</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to={"/createDataItem"}>Create New</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </div>
    );
};

export default WithNav;

// <Link className="nav-link active" aria-current="page" to={"/dashboard"}>Dashboard</Link>
// <Link className="nav-link" to={"/profile"}>Profile</Link>
// <Link className="nav-link" to={"#pricing"}>Create New</Link>

// return (
//     <div>
//         <Navbar bg="success" variant="dark">
//             <Logo loggedIn={"loggedIn"}/>
//             <Nav className="me-auto">
//                 <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
//                 <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
//                 <Nav.Link as={Link} to="#pricing">Create New</Nav.Link>
//             </Nav>
//         </Navbar>
//         <Outlet />
//     </div>
// );