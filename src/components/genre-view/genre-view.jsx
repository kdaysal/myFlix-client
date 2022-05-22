import React from "react";
import { Row, Col, Container, Card, CardGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import "./genre-view.scss";

export class GenreView extends React.Component {

    render() {
        const { movies, genre, onBackClick } = this.props; //not using 'movies' yet, but will be used to show related-movies from the same genre (wip)
        return (
            <Container id="genre-view-container">
                <Row>
                    <Col>
                        <CardGroup>
                            <Card className="bg-dark text-white genre-view-card">
                                <Card.Body>
                                    <Card.Title className="genre-name">Genre: {genre.Name}</Card.Title>
                                    <Card.Text className="genre-description">Description: {genre.Description}</Card.Text>
                                    <Button id="back-btn" onClick={() => { onBackClick(null); }}>Go Back</Button>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CardGroup>
                            <Card>
                                <Card.Body>
                                    <Card.Text>
                                        Related-movies:
                                    </Card.Text>
                                    {movies.filter((movie) => movie.Genre.Name === genre.Name).map((movie) => (
                                        <Card>
                                            <Card.Img variant="top" src={movie.ImagePath} />
                                            <Card.Body>
                                                <Card.Title>{movie.Title}</Card.Title>
                                                <Link to={`/movies/${movie._id}`}>
                                                    <Button variant="link">Open</Button>
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </Card.Body>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({ //'shape({...})' means it is an object, and the '.isRequired' means this object IS required
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};