import React from 'react';
import axios from 'axios'; //this will allow me to perform ajax operations. Axios will fetch the movies, then I'll set the 'state' of movies using this.setState
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

//import components
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { MenubarView } from '../navbar-view/navbar-view';
//import { DirectorView } from '../director-view/director-view' // uncomment after this view is created
//import { GenreView } from '../genre-view/genre-view' // uncomment after this view is created
import './main-view.scss';

//creating/exporting the MainView component
export default class MainView extends React.Component { //by adding 'default', I won't need to enclose 'MainView' in {curly braces} in any import statements

  constructor() { //React will use this method to create the component. Always initialize a state's values in the constructor, as it is called before render().
    super(); //call the constructor of the parent class ('React.Component'). This initializes the component's state, and is needed in order for 'this.state' (below) to work.
    this.state = { //initialize all states to empty/null
      movies: [],
      selectedMovie: null, //this variable will represent whether a movie card is clicked (null if no)
      user: null //this variable will represent whether a user is logged in (null if no)
    }
  }

  //make an authenticated request to my API...
  //this method uses Axios to make a GET request to the 'movies' endpoint of my Node.js API and passes a bearer authorization token in the header
  getMovies(token) {
    axios.get('https://kdaysal-my-flix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to MainView's 'movies' state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //this code will execute right after the component is mounted (i.e. right after it is has been fully rendered and added to the DOM)
  componentDidMount() {
    let accessToken = localStorage.getItem('token');//get the value of the token from localStorage. Note - the syntax is: localStorage.getItem('YOUR_KEY')
    if (accessToken !== null) {//if the access token is present, then the user is already logged in and I can set the state accordingly and call getMovies()
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  //custom component method 'setselectedMovie'. When a movie is clicked, this function is invoked and updates the state of MainView's 'selectedMovie' property to that movie
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  //When a user succesfully logs in, the 'onLoggedIn' method  will update the user state of the 'MainView' component to that particular user
  onLoggedIn(authData) { //when a user logs in, the props 'onLoggedIn(data)' is passed to the LoginView and triggers THIS function
    console.log(authData);//FOR TESTING ONLY - delete later
    this.setState({
      user: authData.user.Username //save the username to the 'user' state in MainView
    });

    //save the auth information received from the 'handleSubmit' method (the token and the user) to localStorage
    localStorage.setItem('token', authData.token);//the 'setItem' method accepts 2 args: a kay and a value
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);//allows MainView to get the list of movies from my API - using the auth token
  }

  //when a user logs out, clear out their token and user info from local storage, and reset the state of 'user' to null
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  //display the desired visual output to the UI
  render() {
    const { movies, user } = this.state;

    if (!user) return <Row>
      <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>
    if (movies.length === 0) return <div className="main-view" />;

    //Starting with '/register' below, I'm mirroring the Mini Task-2 example for now - but I must go back later and align my endpoints with my actual API (per documentation.html file)
    return (
      <Router>
        <MenubarView user={user} />
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            {/* before the movies have been loaded... */ }
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col xl={3} lg={4} md={6} sm={12} key={m._id}>
                <MovieCard movie={m} onBackClick={() => history.goBack()} />
              </Col>
            ))
          }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path="/directors/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path={`/users/${user}`}
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              return <Col>
                <ProfileView movies={movies}
                  user={user}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />
          <Route path={`/user-update/${user}`}
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              return <Col>
                <UserUpdate
                  user={user}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />
        </Row>
      </Router>
    );
  }
}

/* *************************************** */
//ORIGINAL CODE BLOCK for render() function - Only purpose of keeping this is for my studying/learning. DELETE before final submission

//   render() {
//     const movies = this.state.movies;
//     if (movies.length === 0) {
//       return <div className="main-view">The list is empty!</div>;
//     } else {
//       return (
          //added 'key={movie_id}' to the movie title <div> in order to resolve the console warning: Each child in a list should have a unique "key" prop.
//         <div className="main-view">
//           {movies.map((movie) => {
//             return <div key={movie._id}>{movie.Title}</div>; //added 'key={movie_id}' to <div> to resolve console warning: Each child in a list should have a unique "key" prop.
//           })}
//         </div>
//       );
//     }
//   }
// }

/* *************************************** */