import React from 'react';

//create a MovieCard component
//having granular components like this makes it easier to reuse these smaller components in different parts of the UI
export class MovieCard extends React.Component {
    render() {
        const { movieData } = this.props; //accessing (extracting) the passed data via 'props' property ('movieData' is the name of the prop used in <MovieCard ... />)
        return <div className="movie-card" >{movieData.Title}</div>;
    }
}