import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, FormGroup, FormControl, Button } from "react-bootstrap";
import './profile-view.scss';

export function ProfileView({ movies, onUpdatedUserInfo }) {
  const [user, setUser] = useState(''); //fill this out appropriately
  // const favoriteMovieList = movies.filter((movies) => {});

  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const getUser = (username) => {
    axios.get(`https://kdaysal-my-flix.herokuapp.com/users/${username}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  //   const handleSubmit = (e) => { };

  //   const removeFav = (id) => { };

  //   const handleUpdate = (e) => { };

  //   useEffect(() => { }, [])





  return (
    <div>
      <p>User: {user.Username}</p>
      <p>Email: {user.Email}</p>
      <p>BirthDate: {user.BirthDate}</p>
      <div>
        <h2>Favorite Movies:</h2>
        {
          favoriteMovieList.map((movies) => {
            return (
              <div key={movies._id}>
                <img src={movies.ImagePath} />
                <Link to={`/movies/${movies._id}`}>
                  <h4>{movies.Title}</h4>
                </Link>
                <Button variant="secondary" onClick={() => removeFav(movies._id)}>Remove from favorites</Button>
              </div>
            )
          })
        }
      </div>
      <form className='profile-form' onSubmit={(e) => handleSubmit(e)}>
        <h2>Need to change some info?</h2>
        <label>Username:</label>
        <input
          type="text"
          name="Username"
          defaultValue={user.Username}
          onChange={e => handleUpdate(e)} />

        <label>Password:</label>
        <input
          type="password"
          name="Password"
          defaultValue={user.Password}
          onChange={e => handleUpdate(e)} />

        <label>Email:</label>
        <input
          type="email"
          name="Email"
          defaultValue={user.Email}
          onChange={e => handleUpdate(e.target.value)} />
        <button variant="primary" type="submit">
          Update info
        </button>
      </form>
    </div>
  ); //end return
} //end ProfileView

//BELOW BLOCK is what I am deleting from the return statement temporarily - just so I can see if I'm getting back the user info data (and before I've defined favoriteMovieList)
/*  



*/