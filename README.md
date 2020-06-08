# WaveSky

[LIVE DEMO](https://wavesky.iskrayev.com/)

## Introduction


[WaveSky](https://wavesky.iskrayev.com/) is the music listening platform with the [SoundCloud](https://soundcloud.com) inspired UX/UI, where users can upload, listen to, comment, and like the songs. The website's frontend was built using `React` and backend is based on `Ruby on Rails`.


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

    <img src="https://i.imgur.com/A5Ir0iZ.png?1" width="40%">

- After typing an _existing_ account, the second form appears. This is made by using a backend call for checking if the user exists in the database.

    <img src="https://i.imgur.com/ty0bEtf.png" width="40%">

- If the user does not exist, the signup modal form shows up.

    <img src="https://i.imgur.com/ty0bEtf.png" width="40%">

## Features

- ### Home page
    
    After login in, the user sees the main profile a home page. It contains all basic user's information such as profile pictures, songs and user's information. On top of the page, there is the navigation bar that is static through all the pages. On the bottom, there is the audio player which is static as well. On the home page, users are able to edit their information and see their statistics.

    ![home](https://i.imgur.com/E943QWu.png)

- ### Navigation bar

    Navigation bar consists of home page link, explore link, search bar, LinkedIn link, GitHub link, and logout button. Using `CSS3` properties, the navigation bar is always fixed to the top of the page.

- ### Upload

    The songs can be uploaded by using the `upload` button on the top navigation bar. After choosing the audio file, the upload form will appear where the user can input all necessary song information. The song will be uploaded to the database by using `Amazon Web Services (AWS S3)`

    ![upload](https://i.imgur.com/tFgnxVH.png)

- ### Bottom player

    The bottom player is always fixed at the bottom of the page using `CSS3` properties. Using `React` and `Redux` global state, the player is always synchronized with other players on the page; moreover, the player keeps playing a song while browsing through other pages.

- ### Song

    ![player](https://i.imgur.com/pPts34h.png)

    Each song container has an author, song title, genre(optional), clickable orange player bar with play/pause button, like button, comment button, delete button. 

    - Clicking `Play` button starts playing the song.
    - Clicking on song `title` - redirects to the song show page.
    - Clicking `like` button either likes or unlikes the song.
    - Clicking `comments` button - redirects to the song show page / comments section.
    - Clicking `edit` button - opens song edit form.
    - Clicking `delete` button - opens delete modal which allows deleting the chosen song.


- ### Main player

    Each song has its own orange player that represents its sound waves.  

    ### Drawing the player 

    - A user starts uploading the audio file. Next, using `JavaScript`'s `arrayBuffer()`, the song information fetched as raw data. After, using `AudioContext` and `decodeAudioData`, the song data is now represented as samples data.

        ``` javascript
        ///not the full code
        getSongData() {
            const audioContext = new AudioContext();
            return this.state.music.arrayBuffer()
                .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
                .then(audioBuffer => this.setState({ metadata: this.filterData(audioBuffer) }))
        }
        ```

    - Extracting information from a single channel by using `audioBuffer.getChannelData(0)` gives an array of all audio samples within the song. Then, the data is filtered by shortening the number of samples and finding the average value of the samples within a certain range. The filtered data then saved to the database with the song so it can be used later for drawing the player. 

        ``` javascript
        ///not the full code
        filterData(audioBuffer) {
            const rawData = audioBuffer.getChannelData(0);
            const samples = 222;
            const blockSize = Math.floor(rawData.length / samples);
            const filteredData = [];
            for (let i = 0; i < samples; i++) {
                let blockStart = blockSize * i; 
                let sum = 0;
                for (let j = 0; j < blockSize; j++) {
                    sum = sum + Math.abs(rawData[blockStart + j]) 
                }
                filteredData.push(sum / blockSize);
            }
            return filteredData;
        };
        ```  

    - After the song is saved, a user can open their Home Page where all songs will be located. Each song has its own 'orange' player which is drawn by using `JavaScript`'s `canvas`. In order to draw the data, the song data is fetched with a song from the database. After iterating through the data, each sample is drawn on the canvas accordingly to its value.

        ``` javascript
        ///not the full code
        draw(normalizedData, canvas, ctx, counter = null, alpha = null) {
         // draw the initial canvas
            if (normalizedData) {
                const width = (Math.floor((canvas.width) / normalizedData.length)) * 1.5;
                for (let i = 0; i < normalizedData.length; i++) {
                    const x = width * i;
                    let height = normalizedData[i];
                    if (i < counter) {
                        this.drawLineSegment(ctx, x, height * 120, `rgba(255,66,0,${alpha})`);
                        this.drawLineSegment(ctx, x, -height * 60, `rgb(255,165,127, ${alpha})`);
                    } else {
                        this.drawLineSegment(ctx, x, height * 120, "rgb(143,143,143)");
                        this.drawLineSegment(ctx, x, -height * 60, "#c2c2c2");
                    }
                }
            }
        };
        ```

    - Adding click event listener to each `canvas` allows to click on the player and control the timing of the song.

        ``` javascript
        ///not the full code
        handleCanvasClick(event) {
            event.persist();
            let e = event.nativeEvent
            if (this.wasPlayed) {
                let position = e.layerX / event.currentTarget.width
                let samplePosition = (Math.floor(222 * position))
                this.newPosition = samplePosition;
                let seconds = (this.props.song.duration / 222);
                let songPosition = seconds * samplePosition;
                let audio = document.getElementById("player")
                audio.currentTime = songPosition;
                this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { songPosition }))
            }
        }
        ```

- ### Song show page

    The song show page has the comment section and also the song description.

    ![show](https://i.imgur.com/t9Qtlp7.png)

- ### Explore 

    On the explore page, users can see randomly fetched songs and interact with other users' profiles.

    ![explore](https://i.imgur.com/IBUTgLS.png)

    The songs are fetched randomly by using `random()` query.

    ``` ruby
    class Api::RandomSongsController < ApplicationController
        def index
            @songs = Song.limit(12).order("RANDOM()")
            render "/api/songs/index"
        end
    end
    ```

## Hosting

The application is hosted on `Heroku` cloud platform. Using `AWS Route 53`, the custom domain is used for this application with a secure `SSL` certificate.








