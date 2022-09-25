import React from "react";
import { Row, Col, Container, Card, CardGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import "./director-view.scss";

export class DirectorView extends React.Component {

    render() {
        const { movies, director, onBackClick } = this.props; //not using 'movies' yet, but will be used to show related-movies from the same director (wip)
        return (
            <Container id="director-view-container">
                <Row>
                    <Col>
                        <CardGroup>
                            <Card className="bg-dark text-white director-view-card">
                                <Card.Body>
                                    <Card.Title className="director-name">Director: {director.Name}</Card.Title>
                                    <Card.Text className="director-bio">Bio: {director.Bio}</Card.Text>
                                    <Card.Text className="director-birth">Birth: {director.Birth}</Card.Text>
                                    <Card.Text className="director-death">Death: {director.Death}</Card.Text>
                                    <Button id="back-btn" onClick={() => { onBackClick(null); }}>Go Back</Button>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CardGroup>
                            <Card className="related-movies-card">
                                <Card.Body>
                                    <Card.Text className="related-movies-header-text">
                                        Related-movies:
                                    </Card.Text>
                                    {movies.filter((movie) => movie.Director.Name === director.Name).map((movie) => (
                                        <Card className="director-card bg-dark text-white mt-5 ml-auto mr-auto">
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

DirectorView.propTypes = {
    director: PropTypes.shape({ //'shape({...})' means it is an object, and the '.isRequired' means this object IS required
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};