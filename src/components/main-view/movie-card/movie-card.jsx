import React from 'react';

//create a MovieCard component
//having granular components like this makes it easier to reuse these smaller components in different parts of the UI
export class MovieCard extends React.Component { //(just for sake of example) here there is no 'default' after 'export', so I'll need to enclose 'MovieCard' in {curly braces} in any import statement.
    render() {
        const { movieData, onMovieClick } = this.props; //accessing (extracting) the passed data via 'props' property ('movieData' is the name of the prop used in <MovieCard ... />)
        return <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>{movieData.Title}</div>;
    }
}