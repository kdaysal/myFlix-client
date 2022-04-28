import React, { useState } from 'react'; //the 'useState' hook provides a way to rewrite 'LoginView' as a more readable function component

//create/export LoginView function component
export function LoginView(props) {
    const [username, setUsername] = useState(''); //call the useState() method (imported from React) with an empty string (initial value of login variable)
    const [password, setPassword] = useState(''); //the destructure syntax here = same as setting the current state value equal to: 'this.state.password'

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        // props.onLoggedIn(username);
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
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}