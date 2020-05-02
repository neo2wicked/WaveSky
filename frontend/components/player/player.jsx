import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default class Player extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        
        this.playing = false,
        this.ended = this.ended.bind(this)
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
        this.songUrl = "";
        this.seeked = this.seeked.bind(this)
        this.eventListener = null;
        
    }

    handleClick(e) {
        e.preventDefault();
        this.props.receiveCurrentSong({})
    }

    

    play(currentTime){
        // console.log(e.currentTarget.currentTime)
        this.playing = true;
        this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: true, drawing: true }, { songPosition: currentTime}))
    }

    pause(currentTime){
        this.playing = false;
        this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: false, drawing: false }, { songPosition: currentTime }))
    }

    componentDidUpdate(){
       
        let audio = document.getElementById("player")

        // if (!this.eventListener && audio.duration){

        // audio.addEventListener("playing", ()=>{
        //     audio.play()
        //         .then(() => this.play(audio.currentTime))
        // })
        // audio.addEventListener("waiting", ()=>{
        //     audio.pause()
        //     this.pause(audio.currentTime)

        // })
        // }

        if (this.playing !== this.props.currentSong.playing) {
            this.playing = this.props.currentSong.playing
            if (this.playing) {
                audio.play()
                    .then(() => this.play(audio.currentTime))//this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: this.playing }, { drawing: false })))
                
                
            } else {
                audio.pause()
                this.pause(audio.currentTime)
                //this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: this.playing }, { drawing: false }))
            }
        }
    }

    componentDidMount(){
        let audio = document.getElementById("player")

        if (!this.eventListener) {
            this.eventListener = true;
            audio.addEventListener("playing", () => {
                
                // if (this.playing !== this.props.currentSong.playing) {
                //     this.playing = this.props.currentSong.playing
                    if (!this.playing){
                        audio.play()
                            .then(() => this.play(audio.currentTime))
                    }
                
            })
            audio.addEventListener("pause", () => {
                if(this.playing){
                    audio.pause()
                    this.pause(audio.currentTime)
                }
            })
            audio.addEventListener("waiting", () => {
                if(this.playing){
                       this.pause(audio.currentTime)
                }
            })
        }

    }
    
    ended(){

        
    }

    seeked(e){
        this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, {songPosition: e.target.currentTime}))
    }


    checkUrl() {
        if (this.props.currentSong) {
            this.songUrl = this.props.currentSong.musicUrl
        } else {
            this.songUrl = ""
        }
    }

    render() {
        return (
            <div>
                {}
                <button onClick={this.handleClick}>CLICK ME</button>
                {this.checkUrl()}
                <ReactAudioPlayer
                    id="player"
                    controls
                    src={this.songUrl}
                    onSeeked={this.seeked}
                    // id={`audio-${this.props.i}`}
                    // onAbort={this.pause}
                    onEnded={this.ended}
                    // onPause={this.pause}
                    // onPlay={this.play}
                // onListen={this.onListen}
                />
                 
            </div>
        )
    }
}