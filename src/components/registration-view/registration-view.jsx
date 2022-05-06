//The 'RegistrationView' is rendered if there is a user in the state

import React, { useState } from 'react'; //the 'useState' hook provides a way to rewrite 'RegistrationView' as a more readable function component
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';


import './registration-view.scss';
//Note - will need to import axios later (when I'm actually connecting to my Heroku app)

//create/export RegistrationView function component (with hook)
export function RegistrationView(props) {
  //call the useState() method (imported from React) with empty strings (initial values of registration variables)
  //this gives me variables ('username', 'password') and methods to update them ('setUsername', 'setPassword')
  const [username, setUsername] = useState(''); //the destructure syntax here = same as 'this.state.username' and 'this.setUsername' in class
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  //current structure below is just a temporary solution for rendering my SPA views, until proper authentication logic is implemented later
  const handleRegister = (e) => {
    e.preventDefault(); //this is necessary for buttons whose type="submit" - in order to prevent the page from refreshing/reloading, which is not the user experience that I want
    console.log(`username: ${username}, password: ${password}, email: ${email}, birthdate: ${birthdate}`);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    //props.onLoggedIn(username); //this may change to 'props.onRegistered(...) or something in the near future, but for now, I'm treating this as letting the newly registered user be automatically 'logged in'
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card className="bg-dark text-white">
              <Card.Body>
                <Card.Title>Please Register Below</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      placeholder="Create a username"
                    />
                  </Form.Group>


                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      placeholder="Create a Password (8 or more characters)"
                      minLength="8"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="Your email address"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>BirthDay:</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthdate}
                      onChange={e => setBirthdate(e.target.value)}
                      required
                      placeholder="Your birthday"
                    />
                  </Form.Group>
                  <Button variant="success"
                    type="submit"
                    onClick={handleRegister}>Register me!
                  </Button>
                </Form >
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>

  );
}

//using 'propTypes.exact' here (instead of 'propTypes.shape') because no other additional props should be accepted
RegistrationView.propTypes = {
  user: PropTypes.exact({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired
  })//.isRequired - commenting this out for now until I figure out how to handle error: Failed prop type: The prop `user` is marked as required in `RegistrationView`, but its value is `undefined` at RegistrationView
};