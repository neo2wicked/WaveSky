import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default class Player extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            songPosition: 0,
            duration: null,
        }
        this.playing = false,
        this.ended = this.ended.bind(this)
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
        this.songUrl = "";
        
    }

    handleClick(e) {
        e.preventDefault();
        this.props.receiveCurrentSong({})
    }

    

    play(e){
        // console.log(e.currentTarget.currentTime)
        this.playing = true;
        this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: true }, { songPosition: e.currentTarget.currentTime}))
    }

    pause(e){
        this.playing = false;
        this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: false }, { songPosition: e.currentTarget.currentTime }))
    }

    componentDidUpdate(){
        console.log("plyaer updated")
        let audio = document.getElementById("player")
        let duration = audio.duration

        if (duration){
            if (this.playing !== this.props.currentSong.playing) {
                this.playing = this.props.currentSong.playing
                if (this.playing) {
                    // audio.play()
                   
                } else {
                    // audio.pause()
                }
                this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, this.state, { duration }, { playing: this.playing }))
            }
        }else{
            this.props.receiveCurrentSong(this.props.currentSong)
    
        }
    }

    setDuration(){
        let audio = document.getElementById("player")
        let duration = audio.duration
        console.log("plyaer! updated")
        this.props.receiveCurrentSong(Object.assign(this.props.currentSong, {duration}))

    }
    componentDidMount(){
        // let audio = document.getElementById("player")
        // let duration = audio.duration
        // this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, this.state, { duration }))
    }
    
    ended(){

        
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
                    // id={`audio-${this.props.i}`}
                    // onAbort={this.pause}
                    onEnded={this.ended}
                    onPause={this.pause}
                    onPlay={this.play}
                // onListen={this.onListen}
                />
                {this.songUrl !== "" ? this.setDuration() : null}
                 
            </div>
        )
    }
}