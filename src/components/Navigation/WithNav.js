import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {Outlet} from "react-router";
import Logo from "../Logo/Logo";

const WithNav = () => {
    return (
        <div>
            <Navbar bg="success" variant="dark">
                <Logo loggedIn={"loggedIn"}/>
                <Nav className="me-auto">
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="#pricing">Profile</Nav.Link>
                    <Nav.Link href="#pricing">Create New</Nav.Link>
                </Nav>
            </Navbar>
            <Outlet />
        </div>
    );
};

export default WithNav;