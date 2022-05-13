import React from "react";
import { Row, Col, Container, Card, CardGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import "./director-view.scss";

export class DirectorView extends React.Component {

    render() {
        const { movie, director, onBackClick } = this.props;
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
                        <Button id="director-back-btn" onClick={() => { onBackClick(null); }}>Back</Button>
                        <Button variant="success" id="favorites-btn">Add to Favorites</Button>
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