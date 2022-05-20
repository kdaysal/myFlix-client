import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES } from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

//moviesApp is a combined reducer (a reducer made out of other reducers). To keep the code clean, it splits into two smaller reducers.
const moviesApp = combineReducers({
    visibilityFilter,
    movies
});

export default moviesApp; //note - we only need to export the combined reducer (which exports both of the individual reducers)