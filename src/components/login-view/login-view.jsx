// The 'LoginView' is rendered as long as there's no user in the state (because the 'user' property will be null in the 'MainView' state)

import React, { useState } from 'react'; //the 'useState' hook provides a way to rewrite 'LoginView' as a more readable function component
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"; //I shouldn't need to import this here as it is already imported in main-view.jsx, but just trying to troubleshoot the issue with <Link> not working in this view
import PropTypes from 'prop-types';
//import { RegistrationView } from '../registration-view/registration-view';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import './login-view.scss';
import axios from 'axios';
import { Link } from "react-router-dom";

// create/export LoginView function component (with hook)
export function LoginView(props) {
  // call the useState() method (imported from React) with empty strings (initial values of login variables)
  // this gives me variables ('username', 'password') and methods to update them ('setUsername', 'setPassword')
  const [username, setUsername] = useState(''); //the destructure syntax here = same as 'this.state.username' and 'this.setUsername' in class
  const [password, setPassword] = useState('');

  // declare a hook for each input (for form validation)
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be at least 5 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long');
      isReq = false;
    }
    return isReq;
  }

  // this is to handle existing users signing in with their credentials
  const handleSubmit = (e) => {
    e.preventDefault(); //this is necessary for buttons whose type="submit" - in order to prevent the page from refreshing/reloading, which is not the user experience that I want
    const isReq = validate();
    if (isReq) { //only send a request to the server if the user input passes validation
      console.log(`username: ${username}, password: ${password}`); //FOR TESTING ONLY - delete later
      console.log(`now sending login credentials to the api...`); //FOR TESTING ONLY - delete later

      /* Send a request to the server for authentication, then call props.onLoggedIn(username) */
      axios.post('https://kdaysal-my-flix.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('Error: No such user/password combo found')
        });
    }
  };

  // this is only here for now to test that the 'Register' button's event listener is working
  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Redirecting to RegistrationView...');
  };

  // replaced JSX elements with 'Form'-related Boostrap components (wrapped inside a CardGroup, and contained within a responsive grid) 
  return (
    <Container fluid="md" id="login-view-container">
      <Row>
        <Col>
          <CardGroup>
            <Card className="bg-dark text-white">
              <Card.Body>
                <Card.Title>
                  Please login to continue
                </Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      placeholder="Enter your myFlix username"
                    />
                    {/* Code added here to display any validation errors if they exist */}
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>
                  <br></br>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                    />
                    {/* Code added here to display any validation errors if they exist */}
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <br></br>
                  <Button variant="success" type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Form>
                <br></br>
                <br></br>
                <Form>
                  Don't have a myFlix account yet? Click here:
                  <Button id="register-btn" variant="primary" type="submit" onClick={handleRegister}>
                    Register!
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

// using 'propTypes.exact' here (instead of 'propTypes.shape') because no other additional props should be accepted
LoginView.propTypes = {
  user: PropTypes.exact({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }) // not chaining '.isRequired' here due to error: "The prop 'user' is marked as required in 'LoginView', but its value is 'undefined'."
};