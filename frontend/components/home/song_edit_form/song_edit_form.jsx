import React from 'react';

export default class SongEditForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.song.title,
            genre: this.props.song.genre,
            description: this.props.song.description,
            musicImage: null, 
            musicImageUrl: this.props.song.imageUrl}        
        this.handleClick = this.handleClick.bind(this)
        this.handleFileImage = this.handleFileImage.bind(this)
        this.handleFileImageClick = this.handleFileImageClick.bind(this)
    }

    componentDidMount() {
        // let info = {}
        
        // info = Object.assign(info, { title: this.props.song.title })
        // if (this.props.song.genre) {
        //     info = Object.assign(info, { genre: this.props.song.genre })
        // }
        // if (this.props.song.description) {
        //     info = Object.assign(info, { description: this.props.song.description })
        // }
        // this.setState(info)
       

    }

    handleClick(e) {
        e.preventDefault();
        const formData = new FormData();
        let updatedSong = Object.assign({}, this.props.song, { title: this.state.title, genre: this.state.genre, description: this.state.description })

        formData.append('song[title]', this.state.title);
        formData.append('song[genre]', this.state.genre);
        formData.append('song[description]', this.state.description);
        
        if (this.state.musicImage){
            formData.append('song[music_image]', this.state.musicImage);
            updatedSong = Object.assign(updatedSong, {imageUrl: this.state.musicImageUrl})
        }



        this.props.updateSong({song: updatedSong, form: formData})
            .then(() => { this.props.history.push("/")
                // window.location.reload();
        })
           
          

    }


   



    


    handleFileImageClick(e) {
        let file = document.getElementById("song-form-image-file")
        file.click()
    }
    handleFileImage(e) {
        // e.persist();
        const image = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({ musicImage: image, musicImageUrl: fileReader.result})
            
        };
        if (image){
            fileReader.readAsDataURL(image);
        }
    }

    update(value) {
        return e => (this.setState({ [value]: e.currentTarget.value }))
    }


    componentWillUnmount() {
        // this.setState({
        //     title: "",
        //     genre: "",
        //     description: "",
        //     musicImage: null,
        //     musicImageUrl: null,
        // })
    }

    // cancel(){
    //     this.props.hideEditModal();
    // }

    printErrors(){
             if (this.props.errors.length !== 0){
                return (
                    <div className="song-form-errors">
                        <div>Failed to upload. Errors: </div>
                        <ul className="song-form-errors-list">
                            {this.props.errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )
            }
    }


    render() {
        return (
            <div className="user-edit-modal">

                {/* <div className="song-form-content"> */}
                    <div className="second-song-form">

                        <div className="song-all-inputs">

                            <div className="basic-info">
                                Basic Info
                            </div>

                            <div className="song-info">

                                <div className="image-preview">
                                {this.state.musicImageUrl ? <img src={this.state.musicImageUrl } alt="" /> : null}
                                    <button onClick={this.handleFileImageClick} className="song-form-image-button"><i className="fas fa-camera"></i> Upload image</button>
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
                                        <input value={this.state.title} className="song-form-input" type="text" onChange={this.update("title")} required />
                                    </div>

                                    <div className="text-field">
                                        <div>Genre</div>
                                         <input value={this.state.genre} className="song-form-input genre" type="text" onChange={this.update("genre")} required />
                                    </div>

                                    <div className="">
                                        <div>Description</div>
                                        <textarea value={this.state.description} placeholder="Describe your track" className="description" cols="65" rows="10" onChange={this.update("description")}></textarea>
                                    </div>

                                    {this.printErrors()}
                                </div>
                            </div>

                        </div>

                        <div className="song-form-bottom">
                            <div>* Required fields</div>

                            <div>
                            <button onClick={() => this.props.hideEditModal()} className="song-form-bottom-buttons song-form-cancel" >Cancel</button>
                                <button className="song-form-bottom-buttons song-form-save" onClick={this.handleClick}>Save</button>
                            </div>

                        </div>
                    </div>
                {/* </div> */}
            </div>
            

        )
    }
}