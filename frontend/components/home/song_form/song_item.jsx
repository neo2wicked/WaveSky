import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default class SongItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = { samplePosition: 0,
            playing: false}
            this.newPosition = 0;
            this.handleClick = this.handleClick.bind(this)
            this.handleCanvasClick = this.handleCanvasClick.bind(this)
            
            this.play = this.play.bind(this)
            this.pause = this.pause.bind(this)
            this.onListen = this.onListen.bind(this)
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
        event.persist();
        let e = event.nativeEvent
        if (this.audio.paused){
            this.audio.play()
        }else{
            this.audio.pause()
        }
    }


    handleCanvasClick(event){
        event.persist();
        let e = event.nativeEvent
        
        if (this.state.playing){
            let position = e.layerX / event.currentTarget.width
            let samplePosition = (Math.floor(222 * position))
            this.newPosition = samplePosition;

            let seconds = (this.audio.duration / 222);
            let songPosition = seconds * samplePosition;
            
            this.audio.currentTime = songPosition;
            this.audio.play();
        }else{
            let position = e.layerX / event.currentTarget.width
            let samplePosition = (Math.floor(222 * position))
            this.newPosition = samplePosition;

            let seconds = (this.audio.duration / 222);
            let songPosition = seconds * samplePosition;

            this.audio.currentTime = songPosition;
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

    // clearInterval(this.eachSample)

    // const audio = document.getElementById(`audio-${buttonNumber}`);
    const canvas = document.getElementById(`canvas-${buttonNumber}`);
    const ctx = canvas.getContext("2d");
    let ms = (this.audio.duration / 222) * 1000;
    let alpha = 0;

    let fading = null;

    //moves the canvas's songs position when clicked
    fading = setInterval(() => {
        this.draw(this.props.song.metadata, canvas, ctx, this.newPosition, alpha);
        alpha += 0.1;
    }, ms/ 10)



    //set interval for color changing
    this.eachSample = setInterval(() => {
        //clears each interval every time
        clearInterval(fading);
        alpha = 0;
        //just faing effect for each sample

        fading = setInterval(() => {
            this.draw(this.props.song.metadata, canvas, ctx, this.newPosition, alpha);
            alpha += 0.1;
        }, ms / 10)

        this.newPosition++;


    }, ms);


} 

play(){
    this.setState({playing: true})
    this.drawPlayingSong(this.props.i)
}
pause(){
    this.setState({ playing: false })
    clearInterval(this.eachSample)
}

onListen(e){
    console.log(this.audio.canplay)
}







    playNext(){
        //need to work on
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
                    onEnded={this.playNext}
                    onPause={this.pause}
                    // onListen={this.onListen}
                />
                
                <img src="/assets/party1.jpg" alt=""/>

                <div className="song-item-elements">
                    
                    <div className="song-item-container-top">
                        <button className="play" onClick={this.handleClick}>&#9658;</button>
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