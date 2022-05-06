//The 'LoginView' is rendered as long as there's no user in the state (because the 'user' property will be null in the 'MainView' state)

import React, { useState } from 'react'; //the 'useState' hook provides a way to rewrite 'LoginView' as a more readable function component
import PropTypes from 'prop-types';
import { RegistrationView } from '../registration-view/registration-view';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import './login-view.scss';

//create/export LoginView function component (with hook)
export function LoginView(props) {
  //call the useState() method (imported from React) with empty strings (initial values of login variables)
  //this gives me variables ('username', 'password') and methods to update them ('setUsername', 'setPassword')
  const [username, setUsername] = useState(''); //the destructure syntax here = same as 'this.state.username' and 'this.setUsername' in class
  const [password, setPassword] = useState('');

  //current structure below is just a temporary solution for rendering my SPA views, until proper authentication logic is implemented later
  //this is to handle existing users signing in with their credentials
  const handleSubmit = (e) => {
    e.preventDefault(); //this is necessary for buttons whose type="submit" - in order to prevent the page from refreshing/reloading, which is not the user experience that I want
    console.log(`username: ${username}, password: ${password}`);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  //this is only here for now to test that the 'Register' button's event listener is working
  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Redirecting to RegistrationView...');
    //props.onRegistered - TBD
    //return <RegistrationView />; //this does not yet work - clicking the 'Register Me!' button does not render the RegistrationView
  };

  //replaced JSX elements with 'Form'-related Boostrap components 
  //since I'm returning a 2nd 'Form' for the Register-New-User button, I enclosed both of the 'Forms' inside of <section> tags
  return (
    <Container fluid="md">
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
                  </Form.Group>
                  <br></br>
                  <Button variant="success" type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Form>
                <br></br>
                <br></br>
                <Form>
                  <Form.Label>
                    Don't have a myFlix account yet? Click here:
                    <Button id="register-btn" variant="primary" type="submit" onClick={handleRegister}>
                      Register!
                    </Button>
                  </Form.Label>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>

    </Container>
  );
}

//using 'propTypes.exact' here (instead of 'propTypes.shape') because no other additional props should be accepted
LoginView.propTypes = {
  user: PropTypes.exact({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }) //not chaining '.isRequired' here due to error: "The prop 'user' is marked as required in 'LoginView', but its value is 'undefined'."
};