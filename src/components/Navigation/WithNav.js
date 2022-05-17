import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Outlet} from "react-router";

const WithNav = () => {
    return (
        <div>
            <Navbar bg="info" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/login">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
};

export default WithNav;