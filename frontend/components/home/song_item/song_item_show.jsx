import React from 'react';
import { Link } from "react-router-dom"

export default class SongItemShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            showDelete: false
        }

        this.wasPlayed = false
        this.newPosition = 0;
        this.eachSample = null;

        this.handleClick = this.handleClick.bind(this)
        this.handleCanvasClick = this.handleCanvasClick.bind(this)

        this.onEnded = this.onEnded.bind(this)
        this.handleLike = this.handleLike.bind(this)

        this.handleComment = this.handleComment.bind(this)

        this.handleGenreSearch = this.handleGenreSearch.bind(this)

    }

    renderImage() {
        if (this.props.song.imageUrl) {
            return this.props.song.imageUrl
        } else {
            if (this.props.user.profilePhoto) {
                return this.props.user.profilePhoto
            } else {
                return "https://i.imgur.com/qItJfVP.png"
            }
        }
    }

    renderUserImage() {
        if (this.props.song.profilePhoto) {
            return this.props.song.profilePhoto
        } else {
            return "https://i.imgur.com/qItJfVP.png"
        }

    }

    componentDidMount() {
        this.setCanvasPropertiesAndDraw(this.props.song.metadata)
        if (this.props.currentSong) {
            if (this.props.currentSong.playing) {
                if (this.props.currentSong.id === this.props.song.id) {
                    this.clickFunction();
                    this.drawPlayingSong(this.props.i);
                }
            }
        }
    }

    clickFunction() {
        if (!this.wasPlayed) {
            this.wasPlayed = true;
            if (this.props.currentSong) {
                this.props.receiveCurrentSong(Object.assign({}, this.props.song, { playing: true, songPosition: 0, finished: false, volume: this.props.currentSong.volume }))
            } else {
                this.props.receiveCurrentSong(Object.assign({}, this.props.song, { playing: true, songPosition: 0, finished: false, volume: 0.5 }))
            }

        } else {
            if (this.props.currentSong.playing) {
                this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: false }))
            } else {
                this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: true }))
            }

        }

    }

    handleClick() {
        this.clickFunction();
    }

    componentDidUpdate() {

        let button = document.getElementById(`play-${this.props.i}`)

        if (this.props.currentSong) {
            if (!this.props.currentSong.finished) {
                if (this.props.currentSong.id === this.props.song.id) {
                    //setup was played true if you come back from different page
                    this.wasPlayed = true;
                    let seconds = (this.props.song.duration / 222);
                    //getting audio to make sure the time is perfectly syncronized when on another page
                    let audio = document.getElementById("player")
                    this.newPosition = Math.floor(audio.currentTime / seconds)

                    if (this.props.currentSong.id === this.props.song.id) {

                        if (this.props.currentSong.playing) {
                            setTimeout(() => {
                                if (this.props.currentSong.playing) {
                                    button.innerHTML = "<i class='fas fa-pause'></i>"
                                }
                            }, 30)

                        } else {
                            button.innerHTML = "<i class='fas fa-play'></i>"
                            clearInterval(this.eachSample)
                        }

                        if (this.props.currentSong.drawing) {
                            this.drawPlayingSong(this.props.i)
                        }
                    } else {
                        this.wasPlayed = false;
                        this.newPosition = 0;
                    }
                } else {
                    ////////////////need to wrap it
                    this.wasPlayed = false;
                    button.innerHTML = "<i class='fas fa-play'></i>"
                    this.songPosition = 0;
                    clearInterval(this.fading);
                    clearInterval(this.eachSample)
                    this.resetCanvas()
                    this.eachSample = null;
                }

            } else {
                ////need to wrap it 
                this.wasPlayed = false;
                button.innerHTML = "<i class='fas fa-play'></i>"
                this.songPosition = 0;
                clearInterval(this.fading);
                clearInterval(this.eachSample)
                this.resetCanvas()
                this.eachSample = null;

            }
        }

    }

    handleCanvasClick(event) {
        event.persist();
        let e = event.nativeEvent

        if (this.wasPlayed) {
            // if (this.props.currentSong.playing) {
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

    setCanvasPropertiesAndDraw(data) {
        const canvas = document.getElementById(`canvas-${this.props.i}`);
        const dpr = 1
        const padding = 10;
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
        const ctx = canvas.getContext("2d");
        ctx.translate(1, canvas.height * (2 / 3)); // set Y = 0 to be in the middle of the canvas
        this.draw(data, canvas, ctx)
    }

    resetCanvas() {
        const canvas = document.getElementById(`canvas-${this.props.i}`);
        const ctx = canvas.getContext("2d");
        const width = (Math.floor((canvas.width) / this.props.song.metadata.length)) * 1.5;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < this.props.song.metadata.length; i++) {
            const x = width * i;
            let height = this.props.song.metadata[i] // * canvas.offsetHeight - padding;
            this.drawLineSegment(ctx, x, height * 120, "rgb(143,143,143)");
            this.drawLineSegment(ctx, x, -height * 60, "#c2c2c2");
        }
    }


    draw(normalizedData, canvas, ctx, counter = null, alpha = null) {

        // draw the initial canvas
        if (normalizedData) {
            const width = (Math.floor((canvas.width) / normalizedData.length)) * 1.5;
            for (let i = 0; i < normalizedData.length; i++) {
                const x = width * i;
                let height = normalizedData[i] // * canvas.offsetHeight - padding;

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


    drawLineSegment(ctx, x, height, style) {
        ctx.lineWidth = 2; // how thick the line is
        ctx.strokeStyle = style; // what color our line is
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, -height);
        ctx.stroke();
    };

    drawPlayingSong(buttonNumber) {
        clearInterval(this.eachSample)
        clearInterval(this.fading);
        const canvas = document.getElementById(`canvas-${buttonNumber}`);
        const ctx = canvas.getContext("2d");
        let ms = (this.props.song.duration / 222) * 1000;
        let alpha = 0;
        // moves the canvas's songs position when clicked
        this.fading = setInterval(() => {
            this.draw(this.props.song.metadata, canvas, ctx, this.newPosition, alpha);
            alpha += 0.1;
        }, ms / 100)
        //set interval for color changing
        this.eachSample = setInterval(() => {
            clearInterval(this.fading);
            alpha = 0;
            //just fading effect for each sample
            this.fading = setInterval(() => {
                this.draw(this.props.song.metadata, canvas, ctx, this.newPosition, alpha);

                alpha += 0.1;
            }, ms / 20)

            this.newPosition++;
        }, ms);
    }

    pause() {
        clearInterval(this.eachSample)
        this.setState({ playing: false })
    }

    onEnded() {
        this.setState({ wasPlayed: false })
        clearInterval(this.eachSample)
        this.resetCanvas();
    }

    handleLike() {
        let song = this.props.song
        let songId = song.id;
        let userId = this.props.currentUser.id
        let like = { songId, userId }

        if (song.likes[userId]) {
            delete song.likes[userId]
        } else {
            song.likes[userId] = like
        }
        this.props.createDeleteLike({ song, like })

    }

    printLikes() {
        if (this.props.song.likes) {
            if (this.props.song.likes[this.props.currentUser.id]) {
                return <div onClick={this.handleLike} className="song-item-like show-like show-page-item-buttons"><i className="fas fa-heart"></i><p>{Object.values(this.props.song.likes).length}</p></div>
            } else {
                return <div onClick={this.handleLike} className="song-item-like show-page-item-buttons"><i className="far fa-heart"></i><p>{Object.values(this.props.song.likes).length}</p></div>
            }
        }
    }

    update(value) {
        return e => (this.setState({ [value]: e.currentTarget.value }))
    }

    handleComment() {
        if (this.state.commentBody.length !== 0) {
            const formData = new FormData();
            formData.append('comment[body]', this.state.commentBody);
            formData.append('comment[song_id]', this.props.song.id);
            formData.append('comment[author_id]', this.props.currentUser.id);
            this.props.createComment(formData)
            this.setState({ commentBody: "" })
        }
    }

    handleGenreSearch() {
        this.props.history.push(`/search/${this.props.song.genre}`)
    }

    render() {
        return (
            <div className="show-page-top-container">
                <div className="show-page-top">
                    <div className="show-page-song-info">
                        <div className="show-page-song-play-title">
                            <div className="show-page-song-play-title-box">
                                <button className="show-play-button" id={`play-${this.props.i}`} onClick={this.handleClick}><i className='fas fa-play'></i></button>
                                <div className="show-page-creator-title">
                                    <div className="show-page-creator">
                                        <Link to={`/${this.props.song.username}`}><p >{this.props.song.username}</p></Link>
                                        {this.props.song.genre ? <div onClick={this.handleGenreSearch} className="song-genre-show"># {this.props.song.genre}</div> : null}
                                    </div>
                                    <div className="show-page-title">
                                        <p>{this.props.song.title}</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <canvas onClick={this.handleCanvasClick} className="canvas" id={`canvas-${this.props.i}`}></canvas>
                    </div>
                    <img className="show-page-img" src={this.renderImage()} />
                </div>
            </div>
        )
    }
}