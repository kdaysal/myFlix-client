//The 'RegistrationView' is rendered if there is a user in the state

import React, { useState } from 'react'; //the 'useState' hook provides a way to rewrite 'RegistrationView' as a more readable function component
import PropTypes from 'prop-types';
//Note - will need to import axios later (when I'm actually connecting to my Heroku app)


//create/export RegistrationView function component (with hook)
export function RegistrationView(props) {
    //call the useState() method (imported from React) with empty strings (initial values of registration variables)
    //this gives me variables ('username', 'password') and methods to update them ('setUsername', 'setPassword')
    const [username, setUsername] = useState(''); //the destructure syntax here = same as 'this.state.username' and 'this.setUsername' in class
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');

    //current structure below is just a temporary solution for rendering my SPA views, until proper authentication logic is implemented later
    const handleRegister = (e) => {
        e.preventDefault(); //this is necessary for buttons whose type="submit" - in order to prevent the page from refreshing/reloading, which is not the user experience that I want
        console.log(`username: ${username}, password: ${password}, email: ${email}, birthdate: ${birthdate}`);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username); //this may change to 'props.onRegistered(...) or something in the near future, but for now, I'm treating this as letting the newly registered user be automatically 'logged in'
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
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                Birthday:
                <input type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
            </label>
            <button type="submit" onClick={handleRegister}>Register me!</button>
        </form>
    );
}

//using 'propTypes.exact' here (instead of 'propTypes.shape') because no other additional props should be accepted
RegistrationView.propTypes = {
    user: PropTypes.exact({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthdate: PropTypes.string.isRequired
    }).isRequired
};