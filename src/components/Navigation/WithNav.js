import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Outlet} from "react-router";
import Logo from "../Logo/Logo";

const WithNav = () => {
    return (
        <div>
            <Navbar bg="info" variant="dark">
                <Logo loggedIn={"loggedIn"}/>
                <Nav className="me-auto">
                    <Nav.Link href="/login">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Navbar>
            <Outlet />
        </div>
    );
};

export default WithNav;