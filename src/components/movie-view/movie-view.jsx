import React from 'react';

export class MovieView extends React.Component {
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
                <div className="movie-director">
                    <span className="label">Director-Name: </span>
                    <span className="value">{movie.Director.Name}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        );
    }
}