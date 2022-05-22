//The 'RegistrationView' is rendered if there is a user in the state

import React, { useState } from 'react'; //the 'useState' hook provides a way to rewrite 'RegistrationView' as a more readable function component
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import './registration-view.scss';

//create/export RegistrationView function component (with hook)
export function RegistrationView(props) {
  // call the useState() method (imported from React) with empty strings (initial values of registration variables)
  // this gives me variables ('username', 'password') and methods to update them ('setUsername', 'setPassword')
  const [username, setUsername] = useState(''); // the destructure syntax here = same as 'this.state.username' and 'this.setUsername' in class
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  // declare a hook for each input (for form validation)
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username is Required');
      isReq = false;
    } else if (username.length < 2) {
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
    if (!email) {
      setEmailErr('Email is Required');
      isReq = false;
    }
    else if ((email.indexOf('@') === -1) || (email.indexOf('.') === -1)) {
      setEmailErr('Email format is invalid');
      isReq = false;
    }
    return isReq;
  }

  const handleRegister = (e) => {
    e.preventDefault(); //this is necessary for buttons whose type="submit" - in order to prevent the page from refreshing/reloading, which is not the user experience that I want
    const isReq = validate();
    if (isReq) {
      console.log(`username: ${username}, password: ${password}, email: ${email}, birthdate: ${birthdate}`);
      /* Send a request to the server for authentication, then call props.onLoggedIn(username) */
      axios.post('https://kdaysal-my-flix.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        BirthDate: birthdate
      })
        .then(response => {
          const data = response.data;
          console.log('Data: ' + data);
          alert('Registration successful, please login now!');
          window.open('/', '_self'); // note - the argument '_self' is needed so that the page will open in the current tab
        })
        .catch(response => { //if there was an error...
          console.log(response);
          alert('Something went wrong...unable to register :(')
        });
    }// end IF
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
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>
                  <br></br>
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
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <br></br>
                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="Your email address"
                    />
                    {emailErr && <p>{emailErr}</p>}
                  </Form.Group>
                  <br></br>
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
                  <br></br>
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

// using 'propTypes.exact' here (instead of 'propTypes.shape') because no other additional props should be accepted
RegistrationView.propTypes = {
  user: PropTypes.exact({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired
  })// .isRequired - commenting this out for now until I figure out how to handle error: Failed prop type: The prop `user` is marked as required in `RegistrationView`, but its value is `undefined` at RegistrationView
};