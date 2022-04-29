import React from 'react';
import PropTypes from "prop-types";

//creating/exporting the MovieView component
export class MovieView extends React.Component {

    // below code block is FOR DEMONSTRATION PURPOSES ONLY - adding/removing a keypress listener via componentDidMount() and componentWillUnmount()
    /*
    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }
   */

    render() {
        const { movie, onBackClick } = this.props;
        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-genre-name">
                    <span className="label">Genre-Name: </span>
                    <span className="value">{movie.Genre.Name}</span>
                </div>
                <div className="movie-genre-description">
                    <span className="label">Genre-Description: </span>
                    <span className="value">{movie.Genre.Description}</span>
                </div>
                <div className="movie-director-name">
                    <span className="label">Director-Name: </span>
                    <span className="value">{movie.Director.Name}</span>
                </div>
                <div className="movie-director-bio">
                    <span className="label">Director-Bio: </span>
                    <span className="value">{movie.Director.Bio}</span>
                </div>
                <div className="movie-director-birth">
                    <span className="label">Director-Birth: </span>
                    <span className="value">{movie.Director.Birth}</span>
                </div>
                <div className="movie-director-death">
                    <span className="label">Director-Death: </span>
                    <span className="value">{movie.Director.Death}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({ //'shape({...})' means it is an object, and the '.isRequired' means this object IS required
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
    }).isRequired
};