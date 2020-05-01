import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import {Link } from "react-router-dom"

export default class SongItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            samplePosition: 0,
            playing: false,
        }
        this.drawing = false;
        this.wasPlayed = false
        this.newPosition = 0;
        this.handleClick = this.handleClick.bind(this)
        this.handleCanvasClick = this.handleCanvasClick.bind(this)
        
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
        this.onEnded = this.onEnded.bind(this)
        // this.onListen = this.onListen.bind(this)
    }

    renderImage(){
        if (this.props.song.imageUrl){
            return <img src={this.props.song.imageUrl}/>
        }else{
            if (this.props.user.profilePhoto){
                return <img src={this.props.user.profilePhoto} />
            }else{
                return <img src="https://www.unitedfamilies.org/wp-content/uploads/2015/09/unknown.png" />
            }
        }
    }
        
    componentDidMount(){
        // this.audio = document.getElementById(`audio-${this.props.i}`)

        
        
        // this.audio.addEventListener("playing", ()=>{
        //     this.play()
        // })
        // this.audio.addEventListener("waiting", ()=>{
        //     this.pause()

        // })
        this.setCanvasPropertiesAndDraw(this.props.song.metadata, this.props.i)
    }
    handleClick(event) {
        // event.persist();
        // let e = event.nativeEvent
        let button = document.getElementById(`play-${this.props.i}`)

        if (!this.wasPlayed) {
            this.wasPlayed = true;
            this.drawing = true;
            button.innerHTML = "<i class='fas fa-pause'></i>"
            this.props.receiveCurrentSong(Object.assign({}, this.props.song, {playing: true}))
        }else{

            if (this.props.currentSong.playing) {
                button.innerHTML = "<i class='fas fa-pause'></i>"
                this.drawing = false;
                this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: false }))
            } else {
                button.innerHTML = "<i class='fas fa-play'></i>"
                this.drawing = true;
                this.props.receiveCurrentSong(Object.assign({}, this.props.currentSong, { playing: true }))
            }

        }
       
       
        
        
        
        
        
        // if (!this.state.wasPlayed){
        //     this.setState({wasPlayed: true})
        //     this.props.receiveCurrentSong(this.props.song)
        // }
        // let button = document.getElementById(`play-${this.props.i}`)
        // if (this.audio.paused){
        //     button.innerHTML = "<i class='fas fa-pause'></i>"
        //     this.audio.play()
        // }else{
        //     button.innerHTML = "<i class='fas fa-play'></i>"
        //     this.audio.pause()
        // }
    }


    componentDidUpdate(){
        let button = document.getElementById(`play-${this.props.i}`)
        if (this.props.currentSong.id === this.props.song.id){
            if (this.props.currentSong.playing) {
                button.innerHTML = "<i class='fas fa-pause'></i>"
                this.drawing = true;
            } else {
                button.innerHTML = "<i class='fas fa-play'></i>"
                this.drawing = false;
            }

            if (this.props.currentSong.duration) {
                if (this.drawing === false) {
                    this.drawing = true;
                    this.drawPlayingSong(this.props.i)

                }

            }




        }

        
        console.log("item updated")

     

    }

    handleCanvasClick(event){
        event.persist();
        let e = event.nativeEvent
        
        if (this.wasPlayed){
            if (this.state.playing) {
                let position = e.layerX / event.currentTarget.width
                let samplePosition = (Math.floor(222 * position))
                //NO NEED TO PASS
                this.newPosition = samplePosition;
            
                //
                let seconds = (this.audio.duration / 222);
                
                
                //
                let songPosition = seconds * samplePosition;
                //

                let song = this.props.song
                this.props.receiveCurrentSong({song, songPosition, samplePosition})

                this.audio.currentTime = songPosition;
                this.audio.play()
                    .catch(() => this.pause())
                this.drawPlayingSong(this.props.i);
            } else {
                let position = e.layerX / event.currentTarget.width
                let samplePosition = (Math.floor(222 * position))
                this.newPosition = samplePosition;

                let seconds = (this.audio.duration / 222);
                let songPosition = seconds * samplePosition;
                //
                this.props.receiveCurrentSong({ song, songPosition, samplePosition })

                this.audio.currentTime = songPosition;
            }

        }
    }







setCanvasPropertiesAndDraw(data, i) {
    const canvas = document.getElementById(`canvas-${this.props.i}`);
    const dpr = 1
    const padding = 10;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
    const ctx = canvas.getContext("2d");
    ctx.translate(1, canvas.height * (2 / 3)); // set Y = 0 to be in the middle of the canvas
    this.draw(data, canvas, ctx)
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
    let ms = (this.props.currentSong.duration / 222) * 1000;
   
    
    let alpha = 0;


    // moves the canvas's songs position when clicked
    this.fading = setInterval(() => {
        this.draw(this.props.song.metadata, canvas, ctx, this.newPosition, alpha);
        alpha += 0.1;
    }, ms/100)

    //set interval for color changing
    this.eachSample = setInterval(() => {
        clearInterval(this.fading);
        alpha = 0;
        
        //just fading effect for each sample
        this.fading = setInterval(() => {
            this.draw(this.props.song.metadata, canvas, ctx, this.newPosition, alpha);
            alpha += 0.1;
        }, ms/20)

        this.newPosition++;


    }, ms);


} 

play(){
    // this.setState({playing: true})
    // this.drawPlayingSong(this.props.i)
}
pause(){
    clearInterval(this.eachSample)
    this.setState({ playing: false })
}








    playNext(){
        
    }

    onEnded(){
        this.newPosition = 0;
        this.setState({wasPlayed: false})
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
                        <button className="play" id={`play-${this.props.i}`} onClick={this.handleClick}><i class='fas fa-play'></i></button>
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