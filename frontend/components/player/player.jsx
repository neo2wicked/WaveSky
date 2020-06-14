import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default class Player extends React.Component {
    constructor(props) {
        super(props)
        this.playing = false;
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.songUrl = "";
        this.seeked = this.seeked.bind(this);
        this.eventListener = null;
        this.songPlaying = null;
        this.handlePlayClick = this.handlePlayClick.bind(this)
        this.handleBarClick = this.handleBarClick.bind(this)
        this.onListen = this.onListen.bind(this)
        this.dotPosition = 0;
        this.showVolumeBar = this.showVolumeBar.bind(this)
        this.hideVolumeBar = this.hideVolumeBar.bind(this)
        this.handleVolume = this.handleVolume.bind(this)
        this.ended = this.ended.bind(this)
        this.dotDragging = false;

        this.state = {
            showVolume: "",
            muted: false,
        }
        this.dragStartPositionDot = this.dragStartPositionDot.bind(this)
        this.dragDropPositionDot = this.dragDropPositionDot.bind(this)
        this.dragPosition = this.dragPosition.bind(this)

        this.muteSong = this.muteSong.bind(this);
        this.volume = 0.5;
        this.dragVolume = this.dragVolume.bind(this);
        this.dragEndVolume = this.dragEndVolume.bind(this);
    }

    play(currentTime) {
        this.playing = true;
        this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: true, drawing: true, finished: false }, { songPosition: currentTime }))
    }

    pause(currentTime) {
        this.playing = false;
        this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: false, drawing: false }, { songPosition: currentTime }))
    }

    componentWillUnmount() {
        this.audio.removeEventListener("playing", this.playingListener.bind(this))
        this.audio.removeEventListener("waiting", this.waitingListener.bind(this))
    }

    componentDidUpdate() {
        if (this.props.currentSong && this.props.currentSong.id) {
            if (this.songPlaying !== this.props.currentSong.id) {
                this.songPlaying = this.props.currentSong.id;
                this.audio.play()
                    .then(() => {
                        this.play(this.audio.currentTime)
                    })
            }
            if (this.playing !== this.props.currentSong.playing) {
                this.playing = this.props.currentSong.playing
                if (this.playing) {
                    this.audio.play()
                        .then(() => {
                            this.playButton.innerHTML = "<i class='fas fa-pause'></i>"
                            this.play(this.audio.currentTime)
                        })
                } else {
                    this.playButton.innerHTML = "<i class='fas fa-play'></i>"
                    this.audio.pause()
                    this.pause(this.audio.currentTime)
                }
            }
            this.title.innerHTML = this.props.currentSong.title
            this.author.innerHTML = this.props.currentSong.username
            this.duration.innerHTML = this.showTime(this.props.currentSong.duration)
        }
    }

    componentDidMount() {

        this.image = new Image();
        this.image.src = window.empty;

        document.addEventListener('dragover',(e)=>{
            e.preventDefault();
        })

        this.audio = document.getElementById("player")
        this.orangeBar = document.getElementById("player-bar-orange")
        this.author = document.getElementsByClassName("player-author")[0]
        this.title = document.getElementsByClassName("player-title")[0]
        this.time = document.getElementsByClassName("player-time")[0]
        this.duration = document.getElementsByClassName("player-duration")[0]
        this.playButton = document.getElementById("player-play")
        this.dot = document.getElementById("player-playback-dot")
        this.bar = document.getElementById("player-playback-bar")

        this.setVolume(0.5);

        if (!this.eventListener) {
            this.eventListener = true;
            this.audio.addEventListener("playing", this.playingListener.bind(this))
            this.audio.addEventListener("waiting", this.waitingListener.bind(this))
        }
    }

    playingListener(){
        if (!this.playing) {
            this.playButton.innerHTML = "<i class='fas fa-pause'></i>"
            this.audio.play()
                .then(() => {
                    this.play(this.audio.currentTime)
                })
        }
    }

    waitingListener(){
        if (this.playing) {
            this.playButton.innerHTML = "<i class='fas fa-play'></i>"
            this.pause(this.audio.currentTime)
        }
    }

    ended() {
        this.playing = false;
        this.dotDragging = false;
        this.dot.style.left = "auto";
        this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: false, songPosition: 0, finished: true }))
        this.playButton.innerHTML = "<i class='fas fa-play'></i>";
        this.orangeBar.style.width = "0%";
        this.time.innerHTML = "-- : --"
    }

    seeked(e) {
        this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { songPosition: e.target.currentTime }))
    }

    checkUrl() {
        if (this.props.currentSong) {
            this.songUrl = this.props.currentSong.musicUrl
        } else {
            this.songUrl = ""
        }
    }

    handlePlayClick() {
        if (this.props.currentSong) {
            if (this.playing) {
                this.playButton.innerHTML = "<i class='fas fa-play'></i>"
                this.audio.pause();
                this.pause(this.audio.currentTime)

            } else {
                this.playButton.innerHTML = "<i class='fas fa-pause'></i>"
                this.audio.play()
                    .then(() => this.play(this.audio.currentTime))
            }
        }
    }

    showTime(time) {
        let allTime = time
        let hours = 0;
        let minutes = 0;
        let printed = ""

        if (allTime >= 3600) {
            hours = Math.floor(allTime / 3600)
            allTime -= hours * 3600;
        }
        if (allTime >= 60) {
            minutes = Math.floor(allTime / 60)
            allTime -= minutes * 60;
        }
        let seconds = allTime;
        if (hours > 0) {
            printed = `${hours}:`
        }
        if (minutes > 0) {
            if (minutes < 10) {
                printed += `0${minutes}:`
            } else {
                printed += `${minutes}:`
            }
        } else {
            printed += "00:"
        }
        if (seconds < 10) {
            printed += `0${Math.floor(seconds)}`;
        } else {
            printed += `${Math.floor(seconds)}`
        }
        return printed
    }

    onListen(currentTime) {
        let orangeBarPosition = (currentTime / this.props.currentSong.duration) * 100;
        
        this.time.innerHTML = this.showTime(this.audio.currentTime)
        this.dotPosition = (currentTime / this.props.currentSong.duration) * this.bar.offsetWidth;
        if(!this.dotDragging){
            this.orangeBar.style.width = `${orangeBarPosition}%`
            this.dot.style.left = `${this.dotPosition - 5}px`
        }
    }

    handleBarClick(e) {
        if(this.playing){
            e.persist()
            let songPosition = (e.nativeEvent.layerX / e.nativeEvent.target.offsetWidth) * this.props.currentSong.duration
            this.audio.currentTime = songPosition;
            this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { songPosition }))
        }
    }

    renderImage() {
        if (this.props.currentSong) {
            if (this.props.currentSong.imageUrl) {
                return this.props.currentSong.imageUrl
            } else {
                if (this.props.currentSong.profilePhoto) {
                    return this.props.currentSong.profilePhoto
                } else {
                    return "https://i.imgur.com/qItJfVP.png"
                }
            }
        }
    }

    showVolumeBar(e) {
        e.stopPropagation()
        this.setState({ showVolume: "show-player-volume" })
    }

    hideVolumeBar(e) {
        e.persist()
        let playerBar = document.getElementsByClassName("player-volume-bar")[0]
        if ((e.relatedTarget) !== playerBar) {
            this.setState({ showVolume: "" })
        }
    }

    setVolume(volume){
        let orangeBar = document.getElementsByClassName("player-volume-bar-orange")[0]
        orangeBar.style.height = `${volume * 100}%`
        let dot = document.getElementsByClassName("player-volume-bar-dot")[0]
        dot.style.top = `${80 - volume * 80 - 5}px`
    }

    handleVolume(e) {
        let bar = document.getElementsByClassName("player-volume-bar-container")[0]
        let volume = ((bar.offsetHeight - e.nativeEvent.layerY) / bar.offsetHeight)
        this.volume = volume;
        this.setVolume(volume);
        this.setState({muted: false})
        if (this.props.currentSong) {
            this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { volume }))
        } else {
            this.props.receiveCurrentSong(Object.assign({}, { volume }))
        }
    }

    checkVolume() {
        if (this.props.currentSong) {
            if(this.state.muted){
                return 0;
            }else{
                return this.props.currentSong.volume;
            }
        } else {
            return 0.5;
        }
    }

    dragPosition(e){
        if(this.dotDragging){
            e.persist()
            e.preventDefault()


            let dot = document.getElementById("player-playback-dot");
            let bar = document.getElementById("player-bar");
            let left = bar.getBoundingClientRect().left;

            if (e.nativeEvent.clientX !== 0) {
                let percentage = (e.nativeEvent.clientX - left) / bar.offsetWidth * 100;
                if (percentage >= 100) {
                    this.orangeBar.style.width = `${100}%`
                    dot.style.left = `Calc(${100}% - 5px)`
                } else
                    if (percentage <= 0) {
                        this.orangeBar.style.width = `${0}%`
                        dot.style.left = `Calc(${0}% - 5px)`
                    } else {
                        this.orangeBar.style.width = `${percentage}%`
                        dot.style.left = `Calc(${percentage}% - 5px)`
                    }

            }
        }
    }

    dragDropPositionDot(e){
        if(this.playing){
            this.dotDragging = false;

            let bar = document.getElementById("player-bar");
            let left = bar.getBoundingClientRect().left;

            let percentage = (e.nativeEvent.clientX - left) / bar.offsetWidth;
            let songPosition;
            if(percentage >= 1){
                this.audio.currentTime = 0;
                this.audio.pause();
                this.ended();
            }else{
                songPosition = percentage * this.props.currentSong.duration;
                this.audio.currentTime = songPosition;
                this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { songPosition }))
            }
            
        }
    }
    dragStartPositionDot(e){
        e.dataTransfer.setDragImage(this.image, 0, 0);
        if(this.playing){
            this.dotDragging = true;
        }
    }

    muteSong(){
        this.setState({muted: !this.state.muted}, () => {
            if(this.state.muted){
                this.audio.volume = 0;
                this.setVolume(0)
            }else{
                this.audio.volume = this.volume;
                this.setVolume(this.volume)
            }
        })
    }

    dragStartVolume(){
        document.getElementsByClassName("player-volume-bar-orange")[0].style.transition = 'none';
        document.getElementsByClassName("player-volume-bar-dot ")[0].style.transition = 'none';
    }

    dragEndVolume(){
        this.setVolume(this.volume);
        this.setState({ muted: false })
        if (this.props.currentSong) {
            this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { volume: this.volume }))
        } else {
            this.props.receiveCurrentSong(Object.assign({}, { volume: this.volume }))
        }
        document.getElementsByClassName("player-volume-bar-orange")[0].style.transition = 'height 0.5s';
        document.getElementsByClassName("player-volume-bar-dot ")[0].style.transition = 'top 0.5s';
    }

    dragVolume(e){
        e.persist();
        let bar = document.getElementsByClassName('player-volume-bar-container-fake')[0]
        let top = bar.getBoundingClientRect().top;
        let pos = (e.nativeEvent.clientY - top - bar.offsetHeight) * -1;
        
        let percentage = pos / bar.offsetHeight;
        if(percentage >= 1){
            this.audio.volume = 1;
            this.setVolume(1);
            this.volume = 1;
        } else if (percentage <= 0){
            this.audio.volume = 0;
            this.setVolume(0);
            this.volume = 0;
        } else{
            this.audio.volume = percentage;
            this.setVolume(percentage);
            this.volume = percentage;
        }

    }

    render() {
        return (
            <div className="player-container">
                <div>
                    <button onClick={this.handlePlayClick} id="player-play"><i className='fas fa-play'></i></button>
                </div>

                <div className="player-progress">

                    <div className="player-time">-- : --</div>

                    <div className="player-playback" onDrag={this.dragPosition} onDragEnd={this.dragDropPositionDot} onDragStart={this.dragStartPositionDot} draggable='true'>
                        <button id="player-playback-dot"></button>
                        <div onClick={this.handleBarClick} id="player-playback-bar">
                            <div id="player-bar"></div>
                            <div id="player-bar-orange"></div>
                        </div>
                    </div>

                    <div className="player-duration">-- : --</div>
                </div>

                <div className="player-volume">

                    <div onMouseLeave={this.hideVolumeBar} className={`player-volume-container ${this.state.showVolume}`}>
                        <div className="player-volume-bar-container">
                            <div className="player-volume-bar">
                                <button className="player-volume-bar-dot" draggable="true"></button>
                            </div>
                            <div className="player-volume-bar-orange">

                            </div>
                        </div>

                        <div onClick={this.handleVolume} className="player-volume-bar-container-fake" draggable='true' onDrag={this.dragVolume} onDragStart={this.dragStartVolume} onDragEnd={this.dragEndVolume}>

                        </div>
                    </div>
                    <button onMouseOver={this.showVolumeBar} onClick={this.muteSong} >{!this.state.muted && this.volume !== 0 ? <i className="fas fa-volume-up"></i> : <i className="fas fa-volume-mute"></i>}</button>
                </div>

                <div className="player-description">
                    <img className="player-image" src={this.renderImage()} alt="" />

                    <div className="player-title-description">
                        <div onClick={() => this.props.currentSong ? this.props.history.push(`/${this.props.currentSong.username}`) : null} className="player-author">Play any song</div>
                        <div className="player-title">Just do it</div>
                    </div>
                </div>

                {this.checkUrl()}
                <ReactAudioPlayer
                    volume={this.checkVolume()}
                    listenInterval={30}
                    className="player-audio"
                    id="player"
                    controls
                    src={this.songUrl}
                    onSeeked={this.seeked}
                    onEnded={this.ended}
                    onListen={this.onListen}
                />

            </div>
        )
    }
}