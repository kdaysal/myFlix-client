import React from 'react';
import axios from 'axios'; //this will allow me to perform ajax operations. Axios will fetch the movies, then I'll set the 'state' of movies using this.setState

//import components
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

//creating/exporting the MainView component
export default class MainView extends React.Component { //by adding 'default', I won't need to enclose 'MainView' in {curly braces} for import statements

  constructor() { //React will use this method to create the component. Always initialize a state's values in the constructor, as it is called before render().
    super(); //call the constructor of the parent class ('React.Component'). This initializes the component's state, and is needed in order for 'this.state' (below) to work.
    this.state = { //initialize state
      movies: [],
      selectedMovie: null //this variable will represent whether a movie card is clicked (null if no)
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

  //custom component method 'setselectedMovie'
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  //display to UI
  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movieData={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
          ))
        }
      </div>
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