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

  //add movie to user's list of favorites
  addFavoriteMovie() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const currentFavorites = localStorage.getItem("favorites")
    const movieId = this.props.movie._id
    console.log(`currentFavorites: ${currentFavorites}`);
    console.log(`this movieId: ${movieId}`);

    if (currentFavorites.includes(this.props.movie._id)) {
      console.log(`movie is already favorited`);
      return alert('This movie is already in your favorites list'); //end the function (will not reach the axio statement below)
    }
    else {
      console.log(`Adding ${movieId} to favorites list`);
    }

    axios
      .post(
        `https://kdaysal-my-flix.herokuapp.com/users/${user}/movies/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          method: "POST",
        }
      )
      .then((response) => {
        console.log(response);
        alert(`Move has been added to your favorites.`);
      })
      .catch(function (error) {
        console.log(error);
      });
    //TODO - update local storage to include the newly added movie id
  } //end addFavoriteMovie

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
                  <Button variant="success" id="favorites-btn" onClick={() => this.addFavoriteMovie(movie)}>Add to Favorites</Button>
                  <br></br>
                  <Button id="back-btn" onClick={() => { onBackClick(null); }}>Back</Button>
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