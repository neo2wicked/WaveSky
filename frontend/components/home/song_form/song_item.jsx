import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default class SongItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            samplePosition: 0,
            playing: false,
            wasPlayed: false,
        }

        this.newPosition = 0;
        this.handleClick = this.handleClick.bind(this)
        this.handleCanvasClick = this.handleCanvasClick.bind(this)
        
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
        this.onEnded = this.onEnded.bind(this)
        // this.onListen = this.onListen.bind(this)
    }
        
    componentDidMount(){
        this.audio = document.getElementById(`audio-${this.props.i}`)
        
        
        this.audio.addEventListener("playing", ()=>{
            this.play()
        })
        this.audio.addEventListener("waiting", ()=>{
            this.pause()

        })
        this.setCanvasPropertiesAndDraw(this.props.song.metadata, this.props.i)
    }
    handleClick(event) {
        // event.persist();
        // let e = event.nativeEvent
        if (!this.state.wasPlayed){
            this.setState({wasPlayed: true})
        }
        let button = document.getElementById(`play-${this.props.i}`)
        if (this.audio.paused){
            button.innerHTML = "<i class='fas fa-pause'></i>"
            this.audio.play()
        }else{
            button.innerHTML = "<i class='fas fa-play'></i>"
            this.audio.pause()
        }
    }


    handleCanvasClick(event){
        event.persist();
        let e = event.nativeEvent
        
        if (this.state.wasPlayed){
            if (this.state.playing) {
                let position = e.layerX / event.currentTarget.width
                let samplePosition = (Math.floor(222 * position))
                this.newPosition = samplePosition;

                let seconds = (this.audio.duration / 222);
                let songPosition = seconds * samplePosition;

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
    let ms = (this.audio.duration / 222) * 1000;
    
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
    this.setState({playing: true})
    this.drawPlayingSong(this.props.i)
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
                <ReactAudioPlayer
                    listenInterval={10}
                    src={this.props.song.musicUrl}
                    id={`audio-${this.props.i}`}
                    onAbort={this.pause}
                    onEnded={this.onEnded}
                    onPause={this.pause}
                    // onListen={this.onListen}
                />
                
                <img src="/assets/party1.jpg" alt=""/>

                <div className="song-item-elements">
                    
                    <div className="song-item-container-top">
                        <button className="play" id={`play-${this.props.i}`} onClick={this.handleClick}><i class='fas fa-play'></i></button>
                        <div className="song-item-description">
                            <p className="song-item-description-username">{this.props.song.username}</p>
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