import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Link } from "react-router-dom"

export default class SongItem extends React.Component {
    constructor(props) {
        super(props)

        this.wasPlayed = false
        this.newPosition = 0;
        this.eachSample = null;

        this.handleClick = this.handleClick.bind(this)
        this.handleCanvasClick = this.handleCanvasClick.bind(this)

        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
        this.onEnded = this.onEnded.bind(this)
        // this.onListen = this.onListen.bind(this)
    }

    renderImage() {
        if (this.props.song.imageUrl) {
            return <img src={this.props.song.imageUrl} />
        } else {
            if (this.props.user.profilePhoto) {
                return <img src={this.props.user.profilePhoto} />
            } else {
                return <img src="https://www.unitedfamilies.org/wp-content/uploads/2015/09/unknown.png" />
            }
        }
    }

    componentDidMount() {
        // this.audio = document.getElementById(`audio-${this.props.i}`)



        // this.audio.addEventListener("playing", ()=>{
        //     this.play()
        // })
        // this.audio.addEventListener("waiting", ()=>{
        //     this.pause()

        // })
        this.setCanvasPropertiesAndDraw(this.props.song.metadata)
    }


    clickFunction() {
        // let button = document.getElementById(`play-${this.props.i}`)

        if (!this.wasPlayed) {
            this.wasPlayed = true;
            // button.innerHTML = "<i class='fas fa-pause'></i>"
            if(this.props.currentSong){
                this.props.receiveCurrentSong(Object.assign({}, this.props.song, { playing: true, songPosition: 0, finished: false, volume: this.props.currentSong.volume }))
            }else{
                this.props.receiveCurrentSong(Object.assign({}, this.props.song, { playing: true, songPosition: 0, finished: false, volume: 1.0 }))
            }

        } else {

            if (this.props.currentSong.playing) {
                // button.innerHTML = "<i class='fas fa-pause'></i>"
                this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: false }))
            } else {
                // button.innerHTML = "<i class='fas fa-play'></i>"
                this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: true }))
            }

        }

    }


    handleClick(event) {
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


                    // this.newPosition = Math.floor(this.props.currentSong.songPosition / seconds)


                    if (this.props.currentSong.id === this.props.song.id) {

                        if (this.props.currentSong.playing) {
                            setTimeout(()=>{
                                if (this.props.currentSong.playing){
                                    button.innerHTML = "<i class='fas fa-pause'></i>"
                                }
                            },30)

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
            //NO NEED TO PASS
            this.newPosition = samplePosition;

            //
            let seconds = (this.props.song.duration / 222);


            //
            let songPosition = seconds * samplePosition;
            //
            let audio = document.getElementById("player")
            audio.currentTime = songPosition;
            this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { songPosition }))


            // } else {
            //     let position = e.layerX / event.currentTarget.width
            //     let samplePosition = (Math.floor(222 * position))
            //     this.newPosition = samplePosition;

            //     let seconds = (this.props.song.duration / 222);
            //     let songPosition = seconds * samplePosition;
            //     //
            //     this.props.receiveCurrentSong({ song, songPosition, samplePosition })

            //     this.audio.currentTime = songPosition;
            // }

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



        // this.draw(this.props.song.metadata, canvas, ctx, this.newPosition, alpha);
    }


    draw(normalizedData, canvas, ctx, counter = null, alpha = null) {

        // draw the initial canvas
        // const width = Math.floor((canvas.width) / normalizedData.length) * 1.5;
        const width = (Math.floor((canvas.width) / normalizedData.length)) * 1.5;

        // if (this.state.samplePosition >= counter){
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

        // const audio = document.getElementById(`audio-${buttonNumber}`);
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

    play() {
        // this.setState({playing: true})
        // this.drawPlayingSong(this.props.i)
    }
    pause() {
        clearInterval(this.eachSample)
        this.setState({ playing: false })
    }








    playNext() {

    }

    onEnded() {
        // this.newPosition = 0;
        this.setState({ wasPlayed: false })
        clearInterval(this.eachSample)
    }



    render() {
        return (
            <div className="song-item-container">
                {/* <audio onListen={this.onListen} onPause={this.pause} onPlay={this.play} src={this.props.song.musicUrl} id={`audio-${this.props.i}`}></audio> */}
                {/* <ReactAudioPlayer
                    listenInterval={10}
                    src={this.props.song.musicUrl}
                    id={`audio-${this.props.i}`}
                    onAbort={this.pause}
                    onEnded={this.onEnded}
                    onPause={this.pause}
                    // onListen={this.onListen}
                /> */}

                {this.renderImage()}

                <div className="song-item-elements">

                    <div className="song-item-container-top">
                        <button className="play" id={`play-${this.props.i}`} onClick={this.handleClick}><i className='fas fa-play'></i></button>
                        <div className="song-item-description">
                            <Link to={`/${this.props.song.username}`}><p className="song-item-description-username">{this.props.song.username}</p></Link>
                            <p className="song-item-description-title">{this.props.song.title}</p>
                        </div>
                    </div>

                    <div className="canvas-container">
                        <canvas onClick={this.handleCanvasClick} className="canvas" id={`canvas-${this.props.i}`}>

                        </canvas>
                    </div>


                    <div className="song-item-container-bottom">
                        <div>Like</div>
                        <div>Comment</div>
                    </div>
                </div>
            </div>
        )
    }
}