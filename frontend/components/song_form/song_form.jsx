import React from 'react';
import SongItem from "../home/song_item/song_item"

export default class SongForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {title: "", 
            music: null, 
            metadata: null,
            firstForm: true,
            secondForm: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleFile = this.handleFile.bind(this)
    }

    componentDidMount(){
        
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


    componentDidUpdate(){
    }


    renderForm(){
        if(this.state.firstForm){
            return(
                <div className="song-form-upload">
                    <h3>Drag and drop your tracks &#38; albums here</h3>
                    <div className="upload-btn-wrapper">
                        <button className="upload-button">or choose file to upload</button>
                        <input
                            type="file"
                            onChange={this.handleFile}
                        />
                    </div>

                </div>
            )
        }else{


            
        }

    }

   
    render() {
        return (
            <div className="song-form-contaienr">
                
                
                
                
                
                
                <img className="song-form-image" src="/assets/music-notes.jpg" alt=""/>
                
                
                
                
                
                
                
                
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
            </div>
        )
    }
}