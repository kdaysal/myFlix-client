//The 'LoginView' is rendered as long as there's no user in the state (because the 'user' property will be null in the 'MainView' state)

import React, { useState } from 'react'; //the 'useState' hook provides a way to rewrite 'LoginView' as a more readable function component
import PropTypes from 'prop-types';


//create/export LoginView function component (with hook)
export function LoginView(props) {
    //call the useState() method (imported from React) with empty strings (initial values of login variables)
    //this gives me variables ('username', 'password') and methods to update them ('setUsername', 'setPassword')
    const [username, setUsername] = useState(''); //the destructure syntax here = same as 'this.state.username' and 'this.setUsername' in class
    const [password, setPassword] = useState('');

    //current structure below is just a temporary solution for rendering my SPA views, until proper authentication logic is implemented later
    const handleSubmit = (e) => {
        e.preventDefault(); //this is necessary for buttons whose type="submit" - in order to prevent the page from refreshing/reloading, which is not the user experience that I want
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };

    return (
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Log me in!</button>
        </form>
    );
}

//using 'propTypes.exact' here (instead of 'propTypes.shape') because no other additional props should be accepted
LoginView.propTypes = {
    user: PropTypes.exact({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }) //not chaining '.isRequired' here due to error: "The prop 'user' is marked as required in 'LoginView', but its value is 'undefined'."
};