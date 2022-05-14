import React from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap';
import './movie-view.scss';
import { Link } from "react-router-dom";
import axios from 'axios';

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
      <Container id="movie-view-container">
        <Row>
          <Col>
            <CardGroup>
              <Card className="bg-dark text-white">
                <Card.Body>
                  <Card.Img className="movie-poster" src={movie.ImagePath} />
                  <Card.Title className="movie-title">Title: {movie.Title}</Card.Title>
                  <Card.Text className="movie-description">Description: {movie.Description}</Card.Text>
                  <Card.Text className="movie-genre-name">Genre:
                    <Link to={`/genres/${movie.Genre.Name}`}>
                      <Button variant="link">{movie.Genre.Name}</Button>
                    </Link>
                  </Card.Text>
                  <Card.Text className="movie-director-name">Director:
                    <Link to={`/directors/${movie.Director.Name}`}>
                      <Button variant="link">{movie.Director.Name}</Button>
                    </Link>
                  </Card.Text>
                  <Button id="back-btn" onClick={() => { onBackClick(null); }}>Back</Button>
                  <Button variant="success" id="favorites-btn">Add to Favorites</Button>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
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
  }).isRequired
};