import React, { useState, useEffect } from "react"; //useState and useEffect were for when I was trying to build this as a function component...may end up removing this, as that was not working out well :)
import axios from "axios";
//import { HashRouter as Router, Route, Redirect } from "react-router-dom";
//import PropTypes from "prop-types";
import { Link } from "react-router-dom"; //WIP (not used yet)
import { Container, Row, Col, Card, CardGroup, Form, FormGroup, FormControl, Button } from "react-bootstrap"; //might not end up using all of these - remove later for any not used
//import { LoginView } from "../login-view/login-view";
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
        this.setUsername = this.setUsername.bind(this); //bind statement is needed in Constructor or else it won't work
        this.setPassword = this.setPassword.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setBirthDate = this.setBirthDate.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
    }

    //if user logs out, clear out local storage - this is akin to writing 'localStorage.clear();' in the console
    onLoggedOut() {
        console.log(`Now removing ${user} and ${token} from local storage`)
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('favorites');
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
                    BirthDate: response.data.BirthDate.substring(0,10), //using substring() to cut off the excess zeros from the date format so it is YYYY-MM-DD
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
              Email: this.state.Email,
              BirthDate: this.state.BirthDate
            },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((response) => {
            this.setState({
              Username: response.data.Username,
              Password: response.data.Password,
              Email: response.data.Email,
              BirthDate: response.data.BirthDate
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

    setBirthDate(date){
      //WIP
      this.setState({
          BirthDate: date.target.value
        });
    console.log(`New BirthDate: ${date.target.value}`)
  }

removeFavorite(movieId){
  console.log(`removing this movie from user's favorites`) //WIP
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const currentFavorites = localStorage.getItem("favorites");
  console.log(`movieID to remove ${movieId}`);

  //delete movieId from FavoriteMovies array
  axios
      .delete(
        `https://kdaysal-my-flix.herokuapp.com/users/${user}/movies/${movieId}`,

        { headers: { Authorization: `Bearer ${token}` } },
        {}
      )
      .then((response) => {
        console.log(response);
        alert("Movie deleted from favorites!");
        window.open(`/movies/${movieId}`, "_self");
        //using regex to find/replace (i.e. remove) all instances of this MovieId from local storage 'favorites'
        let find = movieId;
        let re = new RegExp(find, 'g'); //regex to find the movieId (g=global)
        let newCurrentFavorites = currentFavorites.replace(re, ''); //replace all instances of this MovieId with ''
        console.log(`newCurrentFavorites: ${newCurrentFavorites}`) //FOR TESTING ONLY - delete later
        localStorage.setItem('favorites', newCurrentFavorites); //update 'favorites' in local storage
        window.open(`/users/${user}`, "_self"); //reopen (refresh) the profile view - if I don't do this, and if the user hits the 'back' button on the movie card after removing the movie, that movie will still show up in their favorites list
      })
      .catch((err) => console.log(err));

  } //end removeFavorite()

  // deregister the user's account completely
  onDeleteProfile(){
    const deleteMe = window.confirm(
      "Are you absolutely certain you want to completely delete your profile forever?"
    );
    if (deleteMe) {
      console.log('now deleting profile :(')
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const favorites = localStorage.getItem("favorites");

      axios
        .delete(`https://kdaysal-my-flix.herokuapp.com/users/${user}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          alert("Profile successfully deleted - but you can always re-register ;)");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("favorites");
          window.open("/", "_self"); //bring the user back to the root dir
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  } //end onDeleteProfile
  

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
                    <Card>
                      <Card.Body className='card-body-favorites'>
                      {FavoriteMovies.length > 0 && (
                        <div className="browse-more-flix text-center">
                         <h3 className='more-flix-header'>Browse more Flix!</h3>
                           <Link to={`/`}>
                            <Button type="submit">
                             Browse more flix!
                          </Button>
                          </Link>
                        </div>
                      )}
                      {FavoriteMovies.length === 0 && (
                        <div className="favorite-movies-card text-center">
                         <h3>You haven't favorited any movies</h3>
                           <Link to={`/`}>
                            <Button type="submit">
                             Browse some flix!
                          </Button>
                          </Link>
                        </div>
                      )}
                      </Card.Body>
                   </Card>
                  </CardGroup>
                </Col>
              </Row>
              <br></br>
              {/* if favorite movies > 0 */}
              <Row>
                <Col>
                  <CardGroup>
                  {FavoriteMovies.length > 0 &&
                  movies.map((movie) => {
                  if (
                    movie._id ===
                    FavoriteMovies.find((favorite) => favorite === movie._id)
                  ) {
                    return (
                      <Card style={{ minWidth: '18rem', margin:'1rem'}} className="favorite-movies bg-dark text-white" key={movie._id}>
                        <Card.Img src={movie.ImagePath} />
                        <Card.Body>
                          <Card.Title className="favorites-title">
                            {movie.Title}
                          </Card.Title>
                          <Button
                            variant="warning" 
                            id="remove-btn"
                            onClick={() => this.removeFavorite(movie._id)}
                            size="sm"
                          >
                            Unfavorite
                          </Button>
                          <Link to={`/movies/${movie._id}`}>
                      <Button variant="link">Movie Details</Button>
                    </Link>
                        </Card.Body>
                      </Card>
                    );
                    }
                  })
                  }
                  </CardGroup>
                </Col>
              </Row>

              {/* Update user-info form */}
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
                                placeholder="Create a NEW username"
                                />
                            </Form.Group>
                  <br></br>
                            <Form.Group controlId="formPassword">
                              <Form.Label>Password:</Form.Label>
                                <Form.Control 
                                type="password"
                                onChange={this.setPassword}
                                placeholder="Enter a NEW password"
                                />
                            </Form.Group>
                  <br></br>
                            <Form.Group controlId="formEmail">
                              <Form.Label>Email:</Form.Label>
                                <Form.Control 
                                type="email"
                                onChange={this.setEmail}
                                placeholder="Enter your NEW email"
                                />
                            </Form.Group>
                  <br></br>
                            <Form.Group controlId="formBirthDate">
                              <Form.Label>Birthday:</Form.Label>
                                <Form.Control 
                                type="date"
                                onChange={this.setBirthDate}
                                />
                            </Form.Group>
                  <br></br>
                    <Button variant="success" type="submit" onClick={this.updateProfile}>
                      Submit
                    </Button>
                  <br></br>
                  <br></br>
                  <Button
                      className="delete-btn"
                      variant="danger"
                      onClick={() => this.onDeleteProfile()}
                    >
                      Delete myFlix User Profile
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
