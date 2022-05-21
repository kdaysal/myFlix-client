/* Notes on separation of component concerns */
// Maintaining a solid separation of component concerns and making my Redux structure abide by the rules
// means that I'll be able to refactor my app as much as I need without having to touch unrelated pieces of the codebase
// just because they happen to be nearby

import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

// No need for a 'class' component here because it has no state and doesn't need lifecycle Hooks
// Creating a new function component...
function VisibilityFilterInput(props) {
    return <Form.Control
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="filter"
    />;
}

export default connect(
    null,
    { setFilter }
)(VisibilityFilterInput);

/* More notes for learning */
// The VisibilityFilterInput function component is basically a wrapper around a React Bootstrap text input (i.e., 'FormControl')
// and is connected to the store via the 'connect()' function.
// Notice that it already has 'visibilityFilter' in its props, because I will be passing the same visibilityFilter prop that I had in the MoviesList component