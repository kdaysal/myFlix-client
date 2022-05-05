import React from 'react';
import axios from 'axios'; //this will allow me to perform ajax operations. Axios will fetch the movies, then I'll set the 'state' of movies using this.setState
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//import components
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

//creating/exporting the MainView component
export default class MainView extends React.Component { //by adding 'default', I won't need to enclose 'MainView' in {curly braces} in any import statements

  constructor() { //React will use this method to create the component. Always initialize a state's values in the constructor, as it is called before render().
    super(); //call the constructor of the parent class ('React.Component'). This initializes the component's state, and is needed in order for 'this.state' (below) to work.
    this.state = { //initialize states to empty/null
      movies: [],
      selectedMovie: null, //this variable will represent whether a movie card is clicked (null if no)
      user: null //this variable will represent whether a user is logged in (null if no)
    }
  }

  //this code will execute right after the component is mounted (i.e. right after it is has been fully rendered and added to the DOM)
  componentDidMount() {
    axios.get('https://kdaysal-my-flix.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  //custom component method 'setselectedMovie'. When a movie is clicked, this function is invoked and updates the state of the 'selectedMovie' property to that movie
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  //When a user succesfully logs in, this method ('onLoggedIn') will update the user state of the 'MainView' component to that particular user
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  //display the desired visual output to the UI
  render() {
    const { movies, selectedMovie, user } = this.state;

    //return <RegistrationView /> //THIS LINE IS ONLY HERE FOR TESTING PURPOSES (to immediately render the RegistrationView). DELETE THIS LINE LATER

    //If there is no user, render the LoginView. If there is a user logged in, pass the user details as a prop to the LoginView
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    //before the movies have been loaded, return blank <div>
    if (movies.length === 0) return <div className="main-view" />;

    //If the state of 'selectedMovie' is not null, return that selected movie. Otherwise, return ALL movies.
    //remember that the "main-view" div itself is actually enclosed within <Container> tags, even though you don't see them below (see index.jsx)
    //this ^ is what allows me to enclose "MovieView" within a <Row> Bootstrap component here
    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          : movies.map(movie => (
            <Col md={3}>
              <MovieCard key={movie._id} movieData={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          ))
        }
      </Row>
    );
  }
}

/* *************************************** */
//ORIGINAL CODE BLOCK for render() function - Only purpose of keeping this is for my studying/learning

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