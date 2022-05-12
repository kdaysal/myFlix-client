import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import './movie-card.scss';
import { Link } from "react-router-dom";

//creating/exporting a MovieCard component
//having granular components like this makes it easier to reuse these smaller components in different parts of the UI
export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props; //accessing (extracting) the passed data via 'props' property ('movie' is the name of the prop used in the return statement in MainView... <MovieCard ...movie={movie}... />)

    //replaced JSX elements below with 'Card'-related Boostrap components
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

//As props transmit data between comonents, 'propTypes' validate the data types based on the app's configuration
//This sets the static 'propTypes' property on 'MovieCard' to an object containing special value provided as utilities by 'prop-types'
MovieCard.propTypes = {
  movie: PropTypes.shape({ //'shape({...})' means it is an object, and the '.isRequired' means this object IS required
    Title: PropTypes.string.isRequired, //the 'movie' object MAY contain a Title, and if it does, it MUST be of type 'string'
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
  //onMovieClick: PropTypes.func.isRequired //'onMovieClick' MUST be a function and IS required
};