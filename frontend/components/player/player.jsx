import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default class Player extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        
        this.playing = false;
        this.ended = this.ended.bind(this);
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

        this.state = {
            showVolume: ""
        }
        
        
        
    }

    handleClick(e) {
    }

    

    play(currentTime){
        this.playing = true;
        this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: true, drawing: true }, { songPosition: currentTime}))
    }

    pause(currentTime){
        this.playing = false;
        this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: false, drawing: false }, { songPosition: currentTime }))
    }
    componentWillUnmount(){
        let audio = document.getElementById("player")
        
            audio.removeEventListener("playing", () => {
                if (!this.playing) {
                    this.playButton.innerHTML = "<i class='fas fa-pause'></i>"
                    audio.play()
                        .then(() => this.play(audio.currentTime))
                }

            })
            
            audio.removeEventListener("waiting", () => {
                if (this.playing) {
                    this.playButton.innerHTML = "<i class='fas fa-play'></i>"
                    // audio.pause();//////////////////////////
                    this.pause(audio.currentTime)
                }
            })
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
        if(this.props.currentSong && this.props.currentSong.id){
            if (this.songPlaying !== this.props.currentSong.id) {

                // this.playButton.innerHTML = "<i class='fas fa-pause'></i>"
                this.songPlaying = this.props.currentSong.id;
                audio.play()
                    .then(() => {
                        this.play(audio.currentTime)})
            }

            if (this.playing !== this.props.currentSong.playing) {
                this.playing = this.props.currentSong.playing
                if (this.playing) {
                    // this.playButton.innerHTML = "<i class='fas fa-pause'></i>"
                    audio.play()
                        .then(() => {
                            this.playButton.innerHTML = "<i class='fas fa-pause'></i>"
                            this.play(audio.currentTime)
                        })//this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: this.playing }, { drawing: false })))


                } else {
                    this.playButton.innerHTML = "<i class='fas fa-play'></i>"
                    audio.pause()
                    this.pause(audio.currentTime)
                    //this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: this.playing }, { drawing: false }))
                }
            }

            this.title.innerHTML = this.props.currentSong.title
            this.author.innerHTML = this.props.currentSong.username
            this.duration.innerHTML = this.showTime(this.props.currentSong.duration)
        }

       
    }

    componentDidMount(){
        this.orangeBar = document.getElementById("player-bar-orange")
        this.author = document.getElementsByClassName("player-author")[0]
        this.title = document.getElementsByClassName("player-title")[0]
        this.time = document.getElementsByClassName("player-time")[0]
        this.duration = document.getElementsByClassName("player-duration")[0]


        let audio = document.getElementById("player")
        this.playButton = document.getElementById("player-play")
        this.dot = document.getElementById("player-playback-dot")
       


        this.bar = document.getElementById("player-playback-bar")

        if (!this.eventListener) {
            this.eventListener = true;
            audio.addEventListener("playing", () => {
                
                // if (this.playing !== this.props.currentSong.playing) {
                //     this.playing = this.props.currentSong.playing
                    if (!this.playing){
                        this.playButton.innerHTML = "<i class='fas fa-pause'></i>"
                        audio.play()
                            .then(() => {
                                this.play(audio.currentTime)
                   })
                    }
                
            })
            // audio.addEventListener("pause", () => {
            //     if(this.playing){
            //         audio.pause()
            //         this.pause(audio.currentTime)
            //     }
            // })
            audio.addEventListener("waiting", () => {
                if (this.playing) {
                    this.playButton.innerHTML = "<i class='fas fa-play'></i>"
                    // audio.pause();//////////////////////////
                    this.pause(audio.currentTime)
                }
            })
        }

    }
    
    ended(){
        this.dot.style.left = "auto";
        this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: false, songPosition: 0, finished: true}))
        this.playButton.innerHTML = "<i class='fas fa-play'></i>";
        this.orangeBar.style.width = "0%";
        this.time.innerHTML = "-- : --"
        
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
    handlePlayClick(){
        if(this.props.currentSong){
            let audio = document.getElementById("player")
            if (this.playing){
                this.playButton.innerHTML = "<i class='fas fa-play'></i>"
                audio.pause();
                this.pause(audio.currentTime)

            } else {
                this.playButton.innerHTML = "<i class='fas fa-pause'></i>"
                audio.play()
                    .then(() => this.play(audio.currentTime))

            }
        }

    }

    showTime(time){
        let allTime = time
        let hours = 0;
        let minutes = 0;
        let printed = ""
        
        if (allTime >= 3600){
            hours = Math.floor(allTime / 3600)
            allTime -= hours * 3600;
        }
        if (allTime >= 60){
            minutes = Math.floor(allTime / 60)
            allTime -= minutes * 60;
        }
        let seconds = allTime;
        if (hours > 0){
            printed = `${hours}:`
        }
        if(minutes > 0){
            if (minutes < 10){
                printed += `0${minutes}:`
            }else{
                printed += `${minutes}:`
            }
        }else{
            printed += "00:"
        }
        if (seconds < 10){
            printed += `0${Math.floor(seconds)}`;
        }else{
            printed += `${Math.floor(seconds)}`
        }
        return printed

    }
    onListen(currentTime){
        let audio = document.getElementById("player")
        let orangeBarPosition = (currentTime / this.props.currentSong.duration) * 100;
        this.orangeBar.style.width = `${orangeBarPosition}%`
        this.time.innerHTML = this.showTime(audio.currentTime)
        this.dotPosition = (currentTime / this.props.currentSong.duration) * this.bar.offsetWidth;
        this.dot.style.left = `${this.dotPosition - 5}px`

        // audio.volume = this.props.currentSong.volume



    }
    handleBarClick(e){
        let audio = document.getElementById("player")
        e.persist()
        let songPosition = (e.nativeEvent.layerX / e.nativeEvent.target.offsetWidth) * this.props.currentSong.duration
        audio.currentTime = songPosition;
        this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { songPosition }))

    }

    renderImage() {
        if (this.props.currentSong){
            if (this.props.currentSong.imageUrl) {
                return this.props.currentSong.imageUrl
            } else {
                if (this.props.currentSong.profilePhoto) {
                    return this.props.currentSong.profilePhoto
                } else {
                    return "https://www.unitedfamilies.org/wp-content/uploads/2015/09/unknown.png"
                }
            }
        }
    }

    showVolumeBar(e){
        e.stopPropagation()
        this.setState({showVolume: "show-player-volume"})
    }
    hideVolumeBar(e){
        e.persist()
        let playerBar = document.getElementsByClassName("player-volume-bar")[0]
        if ((e.relatedTarget) !== playerBar){
            this.setState({ showVolume: "" })
        }
    }

    handleVolume(e){
        // e.persist()
        let bar = document.getElementsByClassName("player-volume-bar-container")[0]
        console.log(e.nativeEvent.layerY)
        let volume = ((bar.offsetHeight - e.nativeEvent.layerY) / bar.offsetHeight)
        
        
        let orangeBar = document.getElementsByClassName("player-volume-bar-orange")[0]
        orangeBar.style.height = `${volume*100}%`

        let dot = document.getElementsByClassName("player-volume-bar-dot")[0]
        dot.style.top = `${bar.offsetHeight - volume * bar.offsetHeight - 5}px`
        
        if(this.props.currentSong){
            this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { volume }))
        }else{
            this.props.receiveCurrentSong(Object.assign({}, { volume }))
        }

    }
    checkVolume(){
        if (this.props.currentSong){
            return this.props.currentSong.volume
        }else{
            return 1;
        }
    }
    render() {
        return (
            <div className="player-container">
                <div>
                    <div onClick={this.handlePlayClick} id="player-play"><i className='fas fa-play'></i></div>
                </div>

               <div className="player-progress">
                    
                    <div className="player-time">-- : --</div>
                    
                    <div className="player-playback">
                        <div id="player-playback-dot"></div>
                        <div onClick={this.handleBarClick}  id="player-playback-bar">
                            <div id="player-bar"></div>
                            <div id="player-bar-orange"></div>
                        </div>
                    </div>

                    <div className="player-duration">-- : --</div>
               </div>

                <div className="player-volume">

                    <div onMouseLeave={this.hideVolumeBar}  className={`player-volume-container ${this.state.showVolume}`}>
                        <div className="player-volume-bar-container">
                            <div className="player-volume-bar">
                                <div className="player-volume-bar-dot"></div>
                            </div>
                            <div className="player-volume-bar-orange">
                                
                            </div>
                        </div>

                        <div onClick={this.handleVolume} className="player-volume-bar-container-fake">

                        </div>
                    </div>
                    <button onMouseOver={this.showVolumeBar} ><i className="fas fa-volume-up"></i></button>
                </div>

                <div className="player-description">
                    <img className="player-image" src={this.renderImage()} alt=""/>

                    <div className="player-title-description">
                        <div onClick={()=> this.props.history.push(`/${this.props.currentSong.username}`)} className="player-author">Play any song</div>
                        <div className="player-title">Just do it</div>
                    </div>
                </div>

                {this.checkUrl()}
                <ReactAudioPlayer
                    volume={this.checkVolume()}
                    listenInterval = {30}
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