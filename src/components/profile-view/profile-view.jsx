import React, { useState, useEffect } from "react"; //useState and useEffect were for when I was trying to build this as a function component...may end up removing this, as that was not working out well :)
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; //WIP (not used yet)
import { Container, Row, Col, Card, Form, FormGroup, FormControl, Button } from "react-bootstrap"; //might not end up using all of these - remove later for any not used
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

    //instead of these handle methods, I will amend the form in the render statement to update the state like this: this.setUsername(e.target.value)
    //delete the 2 handle methods below after this is built out
    handleUpdate(e) {
        //WIP
        e.preventDefault();
        console.log('updating info')
    }

    handleSubmit(e) {
        //WIP
        e.preventDefault();
        console.log(`updates submitted`);
    }

    render() {
        const { Username, Password, Email, BirthDate, FavoriteMovies } = this.state;
        console.log(`password: ${Password}`) //FOR TESTING ONLY - delete later
        const { movies, onBackClick } = this.props; //WIP - will need 'movies' for mapping thru the user's favorite movies in the render function

        //Using this raw html format from the video example for now
        //come back here and replace html tags with React Bootstrap (Container, Row, Col, Card, etc)
        return (
            <div>
                <p>User: {Username}</p>
                <p>Email: {Email}</p>
                <p>BirthDate: {BirthDate}</p>
                <div>
                    <h2>Favorite Movies:</h2>
                    {/* map thru matching movies here */}
                </div>
                <br></br>
                <form className='profile-form' onSubmit={(e) => handleSubmit(e)}>
                    <h2>Need to change your info?</h2>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="Username"
                        defaultValue={Username}
                        onChange={e => handleUpdate(e)} />

                    <label>Password:</label>
                    <input
                        type="password"
                        name="Password"
                        defaultValue={""}
                        onChange={e => handleUpdate(e)} />

                    <label>Email:</label>
                    <input
                        type="email"
                        name="Email"
                        defaultValue={Email}
                        onChange={e => handleUpdate(e.target.value)} />
                    <button variant="primary" type="submit">
                        Update info
                    </button>
                </form>
            </div>
        );
    }
}