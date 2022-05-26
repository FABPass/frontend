import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {Outlet} from "react-router";
import Logo from "../Logo/Logo";
import {Link} from "react-router-dom";

const WithNav = () => {
    return (
        <div>
            <Navbar bg="success" variant="dark">
                <Logo loggedIn={"loggedIn"}/>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                    <Nav.Link as={Link} to="#pricing">Create New</Nav.Link>
                </Nav>
            </Navbar>
            <Outlet />
        </div>
    );
};

export default WithNav;