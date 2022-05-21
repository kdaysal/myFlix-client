export const SET_MOVIES = 'SET_MOVIES'; //SET_MOVIES initializes teh movies list with movies
export const SET_FILTER = 'SET_FILTER'; //SET_FILTER sets the filter to filter the movies list

//exporting functions is similar to using event constructors - I will call them from a view to formally express the change that I want to perform on the app's state
export function setMovies(value) {
    console.log('SET_MOVIES action triggered');
    return { type: SET_MOVIES, value };
}

export function setFilter(value) {
    console.log('SET_FILTER action triggered');
    return { type: SET_FILTER, value };
}