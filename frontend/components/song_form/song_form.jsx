import React from 'react';
import SongItem from "../home/song_item/song_item"

export default class SongForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            genre: "",
            description: "",
            music: null,
            musicImage: null,
            metadata: null,
            firstForm: true,
            secondForm: false,
            musicImageUrl: null,
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleFileMusic = this.handleFileMusic.bind(this)
        this.handleFileImage = this.handleFileImage.bind(this)
        this.handleFileMusicClick = this.handleFileMusicClick.bind(this)
        this.handleFileImageClick = this.handleFileImageClick.bind(this)
        this.cancel = this.cancel.bind(this)
    }

    componentDidMount() {

    }

    handleClick(e) {
        e.preventDefault();
        const formData = new FormData();
        this.getSongData()
            .then(() => {
                formData.append('song[title]', this.state.title);
                formData.append('song[genre]', this.state.genre);
                formData.append('song[description]', this.state.description);
                formData.append('song[username]', this.props.user.username);
                formData.append('song[music]', this.state.music);
                formData.append('song[metadata]', this.state.metadata);
                formData.append('song[musicImage]', this.state.musicImage);
                this.props.createSong(formData).upload.addEventListener("progress", e => {
                    console.log(e)
                })
            })
          

    }


    filterData(audioBuffer) {
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



    getSongData() {
        const audioContext = new AudioContext();
        return this.state.music.arrayBuffer()
            .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => this.setState({ metadata: this.filterData(audioBuffer) }))
    }


    handleFileMusicClick(e) {
        let file = document.getElementById("song-form-music-file")
        file.click()
    }
    handleFileMusic(e) {
        this.setState({ music: e.currentTarget.files[0], firstForm: false, secondForm: true })
    }

    handleFileImageClick(e) {
        let file = document.getElementById("song-form-image-file")
        file.click()
    }
    handleFileImage(e) {
        // e.persist();
        // console.log(e.currentTarget.files[0])
        const image = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({ musicImage: image, musicImageUrl: fileReader.result})
            
        };
        if (image){
            fileReader.readAsDataURL(image);
        }
        console.log(image)
    }

    update(value) {
        return e => (this.setState({ [value]: e.currentTarget.value }))
    }


    componentDidUpdate() {
    }

    cancel(){
        this.setState({
            title: "",
            genre: "",
            description: "",
            music: null,
            musicImage: null,
            metadata: null,
            firstForm: true,
            secondForm: false,
            musicImageUrl: null,
        })
    }


    renderForm() {
        if (this.state.firstForm) {
            return (
                <div className="song-form-content">
                    <div className="first-song-form">
                        <h3>Drag and drop your track here</h3>
                        <button onClick={this.handleFileMusicClick} className="music-upload-button">or choose file to upload</button>
                        <input
                            id="song-form-music-file"
                            className="files"        
                            type="file"
                            onChange={this.handleFileMusic}
                        />
                    </div>
                    <img className="song-form-image" src="/assets/music-notes.jpg" alt="" />
                </div>
            )
        } else {
            return (
                <div className="song-form-content">
                    <div className="second-song-form">

                        <div className="song-all-inputs">

                            <div className="basic-info">
                                Basic Info
                            </div>

                            <div className="song-info">

                                <div className="image-preview">
                                    {this.state.musicImageUrl ? <img src={this.state.musicImageUrl} alt="" /> : null}
                                    <button onClick={this.handleFileImageClick} className="song-form-image-button"><i class="fas fa-camera"></i> Upload image</button>
                                    <input
                                        id="song-form-image-file"
                                        className="files"
                                        type="file"
                                        onChange={this.handleFileImage}
                                    />
                                </div>

                                <div className="song-texts">
                                    <div className="text-field">
                                        <div>Title *</div>
                                        <input className="song-form-input" type="text" onChange={this.update("title")} required />
                                    </div>

                                    <div className="text-field">
                                        <div>Genre</div>
                                        <input className="song-form-input genre" type="text" onChange={this.update("genre")} required />
                                    </div>

                                    <div className="">
                                        <div>Description</div>
                                        <textarea placeholder="Describe your track" className="description" cols="65" rows="10" onChange={this.update("description")}></textarea>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="song-form-bottom">
                            <div>* Required fields</div>
                            
                            <div>
                                <button onClick={this.cancel}className="song-form-bottom-buttons song-form-cancel" >Cancel</button>
                                <button className="song-form-bottom-buttons song-form-save" onClick={this.handleClick}>Save</button>
                            </div>

                        </div>
                    </div>
                </div>

            )
        }

    }


    render() {
        return (
            <div className="song-form-container">
                {this.renderForm()}
                {/* {this.state.firstForm ?  : <div className="song-form-image"></div>} */}
            </div>

        )
    }
}