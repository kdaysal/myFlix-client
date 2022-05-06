import React from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap';
import './movie-view.scss';
//import axios from 'axios'; //reminder to import axios (when we get to that in exercise 3.6)

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
                  <Card.Text className="movie-genre-name">Genre: {movie.Genre.Name}</Card.Text>
                  <Card.Text className="movie-genre-description">Genre Info: {movie.Genre.Description}</Card.Text>
                  <Card.Text className="movie-director-name">Director: {movie.Director.Name}</Card.Text>
                  <Card.Text className="movie-director-bio">Bio: {movie.Director.Bio}</Card.Text>
                  <Card.Text className="movie-director-birth">Birth: {movie.Director.Birth}</Card.Text>
                  <Card.Text className="movie-director-death">Death: {movie.Director.Death}</Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
            <Button id="back-btn" onClick={() => { onBackClick(null); }}>Back</Button>
          </Col>
        </Row>
      </Container>
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