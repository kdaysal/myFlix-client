import React, { useState, useEffect } from "react"; //useState and useEffect were for when I was trying to build this as a function component...may end up removing this, as that was not working out well :)
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; //WIP (not used yet)
import { Container, Row, Col, Card, CardGroup, Form, FormGroup, FormControl, Button } from "react-bootstrap"; //might not end up using all of these - remove later for any not used
import { LoginView } from "../login-view/login-view";
import './profile-view.scss';

export class ProfileView extends React.Component {
    constructor() {
        super();
        //initialize values to null/empty
        this.state = {
            Username: null,
            Password: null,
            Email: null,
            BirthDate: null,
            FavoriteMovies: []
        };
        this.setUsername = this.setUsername.bind(this); //needed in Constructor
        this.setPassword = this.setPassword.bind(this);
        this.setEmail = this.setEmail.bind(this);
    }

    //if user logs out, clear out local storage - this is akin to writing 'localStorage.clear();' in the console
    onLoggedOut() {
        console.log(`Now removing ${user} and ${token} from local storage`)
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.setState({
            user: null
        });
    }

    //get the auth token as soon as the component is mounted and call getUserDetails function, passing in the token
    componentDidMount() {
        const userToken = localStorage.getItem('token');
        this.getUserDetails(userToken);
    }

    getUserDetails(token) {
        const name = localStorage.getItem('user');
        axios.get(`https://kdaysal-my-flix.herokuapp.com/users/${name}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    BirthDate: response.data.BirthDate,
                    FavoriteMovies: response.data.FavoriteMovies
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateProfile = (e) => {
        e.preventDefault();
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        let newUser = this.state.Username;
        console.log(newUser);
        axios
          .put(
            `https://kdaysal-my-flix.herokuapp.com/users/${user}`,
            {
              Username: this.state.Username,
              Password: this.state.Password,
              Email: this.state.Email
            },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((response) => {
            this.setState({
              Username: response.data.Username,
              Password: response.data.Password,
              Email: response.data.Email
            });
            localStorage.setItem("user", this.state.Username);
            alert("profile updated successfully!");
            window.open(`/users/${newUser}`, "_self");
          });
      };

      setUsername(newUserName) {
          console.log(`New Username: ${newUserName.target.value}`)
        this.setState({
          Username: newUserName.target.value
        });
      }

      setPassword(password){
          //WIP
        console.log(`New Password: ${password.target.value}`)
        this.setState({
            Password: password.target.value
          });
      }

      setEmail(email){
        //WIP
        this.setState({
            Email: email.target.value
          });
      console.log(`New Email: ${email.target.value}`)
    }



    render() {
        const { Username, Password, Email, BirthDate, FavoriteMovies } = this.state;
        console.log(`password: ${Password}`) //FOR TESTING ONLY - delete later
        const { movies, onBackClick } = this.props; //WIP - will need 'movies' for mapping thru the user's favorite movies in the render function

        return (
            <Container>
              <Row>
                <Col>
                  <CardGroup>
                    <Card className="profile-card bg-dark text-white">
                      <Card.Body>
                         <Card.Title className="profile-title">My Profile</Card.Title> 
                  <Card.Text className="user-name">Username: {Username}</Card.Text>
                  <Card.Text className="user-email">Email: {Email}</Card.Text>
                  <Card.Text className="user-birthdate">Birthday: {BirthDate}</Card.Text>
                      </Card.Body>
                    </Card>
                  </CardGroup>
                </Col>
              </Row>
                <br></br>
              <Row>
                  <Col>
                  <CardGroup>
                      <Card className="update-profile-card bg-dark text-white">
            <Card.Body>
                <Card.Title className="update-account-title">Need to update your account info?</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={this.setUsername}
                      required
                      placeholder="Create a NEW username"
                    />
                  </Form.Group>
                  <br></br>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                    type="password"
                      onChange={this.setPassword}
                      required
                      placeholder="Enter a NEW password"
                    />
                  </Form.Group>
                  <br></br>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control 
                    type="email"
                      onChange={this.setEmail}
                      required
                      placeholder="Enter your NEW email"
                    />
                  </Form.Group>
                  <br></br>
                  <Button variant="success" type="submit" onClick={this.updateProfile}>
                    Submit
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
    }




/* ORIGINAL (basic html) RETURN STATMENT below for reference */

// return (
//     <div>
//         <p>User: {Username}</p>
//         <p>Email: {Email}</p>
//         <p>BirthDate: {BirthDate}</p>
//         <div>
//             <h2>Favorite Movies:</h2>
//             {/* map thru matching movies here */}
            
//         </div>
//         <br></br>
//         <form className='profile-form' onSubmit={(e) => handleSubmit(e)}>
//             <h2>Need to change your info?</h2>
//             <label>Username:</label>
//             <input
//                 type="text"
//                 name="Username"
//                 defaultValue={Username}
//                 onChange={e => handleUpdate(e)} />

//             <label>Password:</label>
//             <input
//                 type="password"
//                 name="Password"
//                 defaultValue={""}
//                 onChange={e => handleUpdate(e)} />

//             <label>Email:</label>
//             <input
//                 type="email"
//                 name="Email"
//                 defaultValue={Email}
//                 onChange={e => handleUpdate(e.target.value)} />
//             <button variant="primary" type="submit">
//                 Update info
//             </button>
//         </form>
//     </div>
// );
// }
// }
