import React from 'react';

export default class MainView extends React.Component { //by adding 'default', I won't need to enclose 'MainView' in {curly braces} for import statements

  constructor() { //React will use this method to create the component. Always initialize a state's values in the constructor, as it is called before render().
    super(); //call the constructor of the parent class ('React.Component'). This initializes the component's state, and is needed in order for 'this.state' (below) to work.
    this.state = { //initialize state
      movies: [
        { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...' },
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...' },
        { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...' }
      ]
    }
  }

  //display to UI
  render() {
    const { movies } = this.state; //ES6 object destructuring. Shorter version of: const movies = this.state.movies;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    //code below will only run if [movies] is not empty. Syntax note: 'Else' logic is implied because if the 'return' statement above were called, the function would stop executing before this line

    //added 'key={movie_id}' to the movie title <div> in order to resolve the console warning: Each child in a list should have a unique "key" prop.
    return (
      <div className="main-view">
        {movies.map(movie => <div key={movie._id}>{movie.Title}</div>)}
      </div>
    );
  }

  render() {
    const movies = this.state.movies;
    if (movies.length === 0) {
      return <div className="main-view">The list is empty!</div>;
    } else {
      return (
        <div className="main-view">
          {movies.map((movie) => {
            return <div key={movie._id}>{movie.Title}</div>; //added 'key={movie_id}' to <div> to resolve console warning: Each child in a list should have a unique "key" prop.
          })}
        </div>
      );
    }
  }
}