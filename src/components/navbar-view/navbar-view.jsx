import React from 'react';
import { Navbar, Container, Nav, Button, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './navbar-view.scss';

function NavbarView({ user }) {

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

    //create a navigation bar that will be displayed across the top of all views
    return (
        <Navbar className="main-nav" sticky="top" bg="secondary" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand className="navbar-logo" id='my-flix-title' href="/">myFlix</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto" id="nav-links">
                        { /* Hide Sign Up if token exists */}
                        {isAuth() && (
                            <Nav.Link href={`/`}>All Movies</Nav.Link>
                        )}
                        {isAuth() && (
                            <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
                        )}
                        {isAuth() && (
                            <Button variant="primary" onClick={() => { onLoggedOut() }}>Logout</Button>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/register">I'm new, sign me up!</Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/">Sign-in</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )//end return
} // end NavbarView

NavbarView.propTypes = {
    user: PropTypes.string,
};

export default NavbarView;

