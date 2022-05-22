import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view" />;

    return <>
        <Col md={12} style={{ margin: '1em' }}>
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
        {filteredMovies.map(m => (
            <Col md={3} key={m._id}>
                <MovieCard movie={m} />
            </Col>
        ))}
    </>;
}

MoviesList.propTypes = {
    movies: PropTypes.array.isRequired,
    visibilityFilter: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(MoviesList); //this connects the MoviesList component to the store, but it only receives the first argument (mapStateToProps).

/* More notes about the 'export default connect...' statement ^ */
// The first argument, mapStateToProps, is a function that converts or transforms the store into props that the MoviesList component will use.
// Remember that the store contains my application’s state, which is why this function is called 'mapStateToProps'.
// The second argument - the list of actions to bind, is implicitly null.
// This could also be written as: export default connect(mapStateToProps, null)(MoviesList);

// In the mapStateToProps function, I extracted visibilityFilter into a prop named visibilityFilter.
// This means that MoviesList’s props contain two properties; the second being movies, which was passed when the component was expressed in the render() method of the MainView component.
// Now, I can filter the array 'movies' based on the value present in visibilityFilter, then render the filtered array into a list of MovieCard components.