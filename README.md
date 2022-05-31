# myFlix-Client
Hosted on Netlify at: https://kdaysal-myflixapp.netlify.app

# Description
This repo will house the client-side code of a Single Page Application called 'myFlix', which builds upon pre-existing server-side code written as a REST API and hosted online as a MongoAtlas database.

# Purpose
<ul>
  <li>Provide users with a way to easily access basic information about popular movies, genres, and directors so they can learn a little more about movies that they might want to see.</li>
  <li>Allow users to create a profile for the purpose of 'favoriting' (saving) movies that they are interested in, and persist this data between session logins so they don't lose the movies that they've marked as favorites.</li>
</ul>

# Features / Views
Main-View
<ul>
<li>After successful user login, return a list of ALL movies to the user which includes a movie poster (image), the movie title, and a clickable 'open' link to learn more about the movie.</li>
<li>Give users the ability to filter the display of movies on the home page by searching for a particular movie title (via a 'filter' text box).</li>
<li>Users can click on the 'open' link, which is provided on every movie card, to see more details about a particular movie.</li>
</ul>
Movie-View
<ul>
<li>Display more granular details about a user-selected movie, including the poster image, title, description, genre, and director</li>
<li>Provide a 'Add to Favorites' button that users can click to instantly add this movie to their list of favorites</li>
<li>Provide a link that users can click on to learn more about the genre of this movie</li>
<li>Provide a link that users can click on go back to the home page and browse more movies</li>
<li>Provide a 'Go Back' button to take users back to the previous page they came from</li>
</ul>
Login-View
<ul>
<li>Allows users to log in with a username and password</li>
<li>Access registration view</li>
<li>Allows new users to register (username, password, email, birthday)</li>
</ul>
Genre-View
<ul>
<li>Display more granular details about the genre of a user-selected movie, including Genre Description</li>
<li>Display 'Related-movies', which are all movies in the database that have this same user-selected genre</li>
<li>Provide a 'Go Back' button to take users back to the previous page they came from</li>
</ul>
</ul>
Director-View
<ul>
<li>Display more granular details about the director of a user-selected movie, including Director Name, Bio, Birth Date, and Death Date (if applicable)</li>
<li>Display 'Related-movies', which are all movies in the database that have this same user-selected Director</li>
<li>Provide a 'Go Back' button to take users back to the previous page they came from</li>
</ul>
Profile-View
<ul>
<li>Display current user info as returned from the database, including Username, Email, and Birthday</li>
<li>If the user does not have any movies in their favorites list, provide them a link to 'Browse more flix!'</li>
<li>If the user does have movies in their favorites list, display Movie Cards of their favorite movies (movie poster, title, and a link to see more 'Movie Details'</li>
<li>Provide users with a button to 'Unfavorite' movies that are in their favorites list</li>
<li>Provide users with a form to update any of their existing user-info (Username, Password, Email, Birthday)</li>
<li>Provide users with a button to unregister / completely delete their myflix user profile</li>
</ul>

## Technologies utilized in this build
<ul>
<li>React (framework)</li>
<li>React-Bootstrap (library/styling)</li>
<li>Redux (pattern/library for managing and updating application state)</li>
<li>React-Bootstrap (library/styling)</li>
<li>Parcel (web application bundler)</li>
<li>Axios (js library for making HTTP requests)</li>
<li>Scss (for styling)</li>
<li>Javascript / ES6</li>
</ul>

## Steps to run this application locally
```
Install Parcel v2.0+
Clone this repository
Navigate to the root folder of where you saved the files, then in Powershell/Terminal type: parcel src/index.html
Open a web browser to the localhost output from parcel (localhost:1234)
```