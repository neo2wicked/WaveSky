# WaveSky

[LIVE DEMO](https://wavesky.iskrayev.com/)

## Introduction


[WaveSky](https://wavesky.iskrayev.com/) is the music listening platform with the [SoundCloud](https://soundcloud.com) inspired UX/UI, where users can upload, listen to, comment, and like the songs. Website's frontend was built using React and backend is based on Ruby on Rails.


## Technologies used

- Ruby / Rails
- React.js
- AJAX
- JBuilder
- Redux
- JavaScript
- Webpack
- Node.js
- HTML5 / CSS3
- Amazon Web Service (S3, Route 53)

## Splash page

The splash page greets the guests the image carousel and orange color theme. This page mainly contains 
information about the website and login/signup buttons.

![splash](https://i.imgur.com/SMUF2sT.gif)

### User Authentication

- Clicking on 'Login' / 'Signup' button opens a modal form. This form includes a Demo User login button and username field.

    <img src="https://i.imgur.com/A5Ir0iZ.png" width="40%">

- After typing an _existing_ account, the second form appears. This is made by using backend call for checking if the user exists in the database.

    <img src="https://i.imgur.com/ty0bEtf.png" width="40%">

- If user does not exist, signup modal form shows up.

    <img src="https://i.imgur.com/ty0bEtf.png" width="40%">

## Features

- ### Home page
    
    After login in, the user sees the main profile home page. It contains all basic user's information such as profile pictures, songs and user's information. On top of the page, there is the navigation bar that is static through all the pages. On the bottom, there is the audio player which is static as well. On the home page, users are able to edit their information and see their statistics.

    ![home](https://i.imgur.com/E943QWu.png)

- ### Navigation bar

    Navigation bar consists of home page link, explore link, search bar, LinkedIn link, GitHub link and logout button. Using CSS3 proprties, the navigation bar is always fixed to the top of the page.

- ### Bottom player

    






