import React from 'react';
import SongItem from "./song_item"

export default class SongForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {title: "", music: null, metadata: null}
        this.handleClick = this.handleClick.bind(this)
        this.handleFile = this.handleFile.bind(this)
    }

    componentDidMount(){
        this.props.fetchUser(this.props.match.params.username)
        this.props.fetchUserSongs(this.props.match.params.username)
            .then(()=>{
                
            })
    }

    handleClick(e) {
        e.preventDefault();
        const formData = new FormData();
        this.getSongData()
            .then(() => {
                formData.append('song[title]', this.state.title);
                formData.append('song[username]', this.props.user.username);
                formData.append('song[music]', this.state.music);
                formData.append('song[metadata]', this.state.metadata);
                this.props.createSong(formData)
            })
        
    }


    filterData(audioBuffer){
        const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
        const samples = 222; // Number of samples we want to have in our final data set
        const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
        const filteredData = [];
        for (let i = 0; i < samples; i++) {
            let blockStart = blockSize * i; // the location of the first sample in the block
            let sum = 0;
            for (let j = 0; j < blockSize; j++) {
                sum = sum + Math.abs(rawData[blockStart + j]) //Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
            }
            filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
        }
        return filteredData;
    };



    getSongData(){
        const audioContext = new AudioContext();
        return this.state.music.arrayBuffer()
            .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => this.setState({metadata: this.filterData(audioBuffer)}))
    }


    handleFile(e){
        this.setState({music: e.currentTarget.files[0]})
    }
    update(value){
        return e => (this.setState({[value]: e.currentTarget.value}))
    }



    draw(normalizedData, canvas, ctx, ms, counter = null){

        // draw the initial canvas
        const width = Math.floor(canvas.width / normalizedData.length) * 1.5;

        for (let i = 0; i < normalizedData.length; i++) {
            const x = width * i;
            let height = normalizedData[i]// * canvas.offsetHeight - padding;

            this.drawLineSegment(ctx, x, height * 120, "rgb(143,143,143)");
            this.drawLineSegment(ctx, x, -height * 60, "#c2c2c2");
        }

        if (counter) {
            for (let i = 0; i < counter; i++) {
                const x = width * i;
                let height = normalizedData[i] // * canvas.offsetHeight - padding;
                this.drawPlaySegment(ctx, x, height * 120, "rgba(255,165,127,0.2)");
                this.drawPlaySegment(ctx, x, -height * 60, "#FFA57F");
                
            }
        }
    };


    

    
        drawPlayingSong(buttonNumber){
            const audio = document.getElementById(`audio-${buttonNumber}`);
            const canvas = document.getElementById(`canvas-${buttonNumber}`);
            const ctx = canvas.getContext("2d");
            let ms = (audio.duration / 222) * 1000;
            let i = 0;
            setInterval(() => {
                draw(data, canvas, ctx, ms, i)
                i += 1;
            }, ms);
        }

        triggerPlay(){
            this.drawPlayingSong
        }






    drawLineSegment(ctx, x, height, style){
        ctx.lineWidth = 2; // how thick the line is
        ctx.strokeStyle = style; // what color our line is
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, -height);

        ctx.stroke();
    };

    componentDidUpdate(){
        this.props.songs.map((song, i) => {
            this.setCanvasPropertiesAndDraw(song.metadata, i)
        })
    }

    drawPlaySegment(ctx, x, height, style){
        ctx.lineWidth = 2; // how thick the line is
        ctx.fillStyle = style; // what color our line is
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, -height);

        ctx.stroke();
    };


    


    setCanvasPropertiesAndDraw(data, i){
        const canvas = document.getElementById(`canvas-${i}`);
        const dpr = 1
        const padding = 10;
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
        const ctx = canvas.getContext("2d");
        ctx.translate(1, canvas.height * (2 / 3)); // set Y = 0 to be in the middle of the canvas
        this.draw(data, canvas, ctx)
    }




    render() {
        return (
            <div style={{backgroundColor: "lightgray"}}>
                <label>
                    Title:
                    <input 
                        type="text"
                        onChange={this.update("title")}    
                    />
                    <input 
                        type="file"
                        onChange={this.handleFile}
                    />

                </label>
                <button onClick={this.handleClick}>Upload</button>

             
                   { this.props.songs.map((song, i) => (


                        <SongItem song={song} i={i}/>

                        // <div>
                        //     <span>{song.title}</span>
                        //     <audio controls>
                        //        <source src={song.musicUrl} type="audio/ogg"/>
                        //        <source src={song.musicUrl} type="audio/mpeg"/>
                        //         Your browser does not support the audio element.
                        //     </audio>
                            
                        //     <canvas className="canvas" id={`canvas-${i}`}>

                        //     </canvas>



                        // </div>
                    ))}

                {/* {this.props.songs.length != 0 ?  : null} */}
                    
              
            </div>
        )
    }
}