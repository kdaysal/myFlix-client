# myFlix-Client
Hosted on Netlify at: https://kdaysal-myflixapp.netlify.app

## Description
This repo will house the client-side code of a Single Page Application called 'myFlix', which builds upon pre-existing server-side code written as a REST API and hosted online as a MongoAtlas database.

## Purpose
* Provide users with a way to easily access basic information about popular movies, genres, and directors so they can learn a little more about movies that they might want to see.

* Allow users to create a profile for the purpose of 'favoriting' (saving) movies that they are interested in, and persist this data between session logins so they don't lose the movies that they've marked as favorites.

## Features / Views
### Main-View
<p float="center">
  <img src="https://github.com/kdaysal/myFlix-client/blob/task-3.8-v1/img/Portfolio-POSTER-myFlixApp.png" width="400" />
</p>

* After successful user login, return a list of ALL movies to the user which includes a movie poster (image), the movie title, and a clickable 'open' link to learn more about the movie.

* Give users the ability to filter the display of movies on the home page by searching for a particular movie title (via a 'filter' text box).

* Users can click on the 'open' link, which is provided on every movie card, to see more details about a particular movie.


### Movie-View
<p float="center">
  <img src="https://github.com/kdaysal/myFlix-client/blob/task-3.8-v1/img/3-movie-view.png" width="400" />
</p>

* Display more granular details about a user-selected movie, including the poster image, title, description, genre, and director

* Provide a 'Add to Favorites' button that users can click to instantly add this movie to their list of favorites

* Provide a link that users can click on to learn more about the genre of this movie

* Provide a link that users can click on go back to the home page and browse more movies

* Provide a 'Go Back' button to take users back to the previous page they came from


### Login-View
<p float="center">
  <img src="https://github.com/kdaysal/myFlix-client/blob/task-3.8-v1/img/6-login-view.png" width="400" />
</p>

* Allows users to log in with a username and password

* Access registration view

* Allows new users to register (username, password, email, birthday)


### Genre-View
<p float="center">
  <img src="https://github.com/kdaysal/myFlix-client/blob/task-3.8-v1/img/4-genre-view.png" width="400" />
</p>

* Display more granular details about the genre of a user-selected movie, including Genre Description

* Display 'Related-movies', which are all movies in the database that have this same user-selected genre

* Provide a 'Go Back' button to take users back to the previous page they came from


### Director-View
<p float="center">
  <img src="https://github.com/kdaysal/myFlix-client/blob/task-3.8-v1/img/5-director-view.png" width="400" />
</p>

* Display more granular details about the director of a user-selected movie, including Director Name, Bio, Birth Date, and Death Date (if applicable)

* Display 'Related-movies', which are all movies in the database that have this same user-selected Director

* Provide a 'Go Back' button to take users back to the previous page they came from


### Profile-View
<p float="center">
  <img src="https://github.com/kdaysal/myFlix-client/blob/task-3.8-v1/img/2-myflix.png" width="400" />
</p>

* Display current user info as returned from the database, including Username, Email, and Birthday

* If the user does not have any movies in their favorites list, provide them a link to 'Browse more flix!'

* If the user does have movies in their favorites list, display Movie Cards of their favorite movies (movie poster, title, and a link to see more 'Movie Details'

* Provide users with a button to 'Unfavorite' movies that are in their favorites list

* Provide users with a form to update any of their existing user-info (Username, Password, Email, Birthday)

* Provide users with a button to unregister / completely delete their myflix user profile

## Technologies utilized in this build

* React (framework)

* React-Bootstrap (library/styling)

* Redux (pattern/library for managing and updating application state)

* React-Bootstrap (library/styling)

* Parcel (web application bundler)

* Axios (js library for making HTTP requests)

* Scss (for styling)

* Javascript / ES6

## Steps to run this application locally
```
* Install Parcel v2.0+
* Clone this repository
* Navigate to the root folder of where you saved the files, then in Powershell/Terminal type: parcel src/index.html
* Open a web browser to the localhost output from parcel (localhost:1234)
```