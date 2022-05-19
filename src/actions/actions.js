//Action Types...
export const SET_MOVIES = 'SET_MOVIES'; //SET_MOVIES is an 'action type' that initializes the movies list with movies
export const SET_FILTER = 'SET_FILTER'; //SET_FILTER sets the filter to filter the movies list

//Action Creators...
//note - exporting functions is similar to using event constructors - I will call them from a view to formally express the change that I want to perform on the app's state
export function setMovies(value) {
    return { //this returns an 'action', which is an object
        type: SET_MOVIES,
        value
    };
}

export function setFilter(value) {
    return {
        type: SET_FILTER,
        value
    };
}