import React from 'react';

//import components
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export default class MainView extends React.Component { //by adding 'default', I won't need to enclose 'MainView' in {curly braces} for import statements

  constructor() { //React will use this method to create the component. Always initialize a state's values in the constructor, as it is called before render().
    super(); //call the constructor of the parent class ('React.Component'). This initializes the component's state, and is needed in order for 'this.state' (below) to work.
    this.state = { //initialize state
      movies: [
        { _id: 1, Title: 'Sausage Party', Description: 'Sausage Party is a 2016 adult computer-animated comedy film directed by Conrad Vernon and Greg Tiernan and written by Kyle Hunter, Ariel Shaffir, Seth Rogen, and Evan Goldberg from a story by Rogen, Goldberg, and Jonah Hill. A parody of Disney and Pixar films, the film follows an anthropomorphic sausage who lives in a supermarket and discovers the truth about what happens when groceries are purchased', ImagePath: 'https://www.imdb.com/title/tt1700841/mediaviewer/rm948965376/', Genre: 'Animated', Director: 'Conrad Vernon' },
        { _id: 2, Title: 'The Village', Description: 'The Village is a 2004 American period thriller film written, produced, and directed by M. Night Shyamalan. It stars Bryce Dallas Howard, Joaquin Phoenix, Adrien Brody, William Hurt, Sigourney Weaver, and Brendan Gleeson. The film is about a village whose population lives in fear of creatures inhabiting the woods beyond it, referred to as Those of Whom We Do Not Speak', ImagePath: 'https://www.imdb.com/title/tt0368447/mediaviewer/rm2834906624/', Genre: 'Horror', Director: 'M. Night Shyamalan' },
        { _id: 3, Title: 'Pulp Fiction', Description: 'Pulp Fiction is a 1994 American black comedy crime film written and directed by Quentin Tarantino, who conceived it with Roger Avary. Starring John Travolta, Samuel L. Jackson, Bruce Willis, Tim Roth, Ving Rhames, and Uma Thurman, it tells several stories of criminal Los Angeles. The title refers to the pulp magazines and hardboiled crime novels popular during the mid-20th century, known for their graphic violence and punchy dialogue', ImagePath: 'https://www.imdb.com/title/tt0110912/mediaviewer/rm1959546112/', Genre: 'Thriller', Director: 'Quentin Tarantino' }
      ],
      selectedMovie: null //this variable will represent whether a movie card is clicked (null if no)
    }
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

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
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