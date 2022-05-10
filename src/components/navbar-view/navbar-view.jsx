import React from 'react';
import './navbar-view.scss';
import { Navbar, Container, Nav, Button, NavbarBrand } from 'react-bootstrap';

export function Menubar({ user }) {

    //Sign Out method
    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self'); //open in the same window
    }

    //Token method
    const isAuth = () => {
        if (typeof window == 'undefined') {
            return false;
        }
        if (localStorage.getItem('token')) {
            return localStorage.getItem('token');
        } else {
            return false;
        }
    }//end isAuth

    //create unordered list
    return (

        <Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand className="navbar-logo" href="/">myFlix</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        { /* Hide Sign Up if token exists */}
                        {isAuth() && (
                            <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
                        )}
                        {isAuth() && (
                            <Button variant="link" onClick={() => { this.onLoggedOut() }}>Logout</Button>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/register">Sign-up</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )//end return
} // end Menubar


