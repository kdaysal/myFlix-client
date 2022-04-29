import React from 'react';
import PropTypes from 'prop-types';

//creating/exporting a MovieCard component
//having granular components like this makes it easier to reuse these smaller components in different parts of the UI
export class MovieCard extends React.Component { //(just for sake of example...) here there is no 'default' after 'export', so I'll need to enclose 'MovieCard' in {curly braces} in any import statement.

    //There are 2 props in the code below: one object ('movieData') and one function ('onMovieClick')
    render() {
        const { movieData, onMovieClick } = this.props; //accessing (extracting) the passed data via 'props' property ('movieData' is the name of the prop used in the return statement in MainView... <MovieCard ...movieData={movie}... />)

        return <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>{movieData.Title}</div>;
    }
}

//As props transmit data between comonents, 'propTypes' validate the data types based on the app's configuration
//This sets the static 'propTypes' property on 'MovieCard' to an object containing special value provided as utilities by 'prop-types'
MovieCard.propTypes = {
    movieData: PropTypes.shape({ //'shape({...})' means it is an object, and the '.isRequired' means this object IS required
        Title: PropTypes.string.isRequired, //the 'movieData' object MAY contain a Title, and if it does, it MUST be of type 'string'
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Featured: PropTypes.bool,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string
        })
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired //'onMovieClick' MUST be a function and IS required
};