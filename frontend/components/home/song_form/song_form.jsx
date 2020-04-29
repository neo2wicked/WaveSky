import React from 'react';

export default class SongForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {title: "", music: null}
        this.handleClick = this.handleClick.bind(this)
        this.handleFile = this.handleFile.bind(this)
    }

    componentDidMount(){
        this.props.fetchUserSongs(this.props.match.params.username)
        this.props.fetchUser(this.props.match.params.username)
    }

    handleClick(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('song[title]', this.state.title);
        formData.append('song[username]', this.props.user.username);
        formData.append('song[music]', this.state.music);
        this.props.createSong(formData)
    }

    handleFile(e){
        this.setState({music: e.currentTarget.files[0]})
    }
    update(value){
        return e => (this.setState({[value]: e.currentTarget.value}))
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

             
                   { this.props.songs.map((song) => (
                        <div>
                            <span>{song.title}</span>
                           <audio controls>
                               <source src={song.musicUrl} type="audio/ogg"/>
                               <source src={song.musicUrl} type="audio/mpeg"/>
                                Your browser does not support the audio element.
                            </audio>

                        </div>
                    ))}
              
            </div>
        )
    }
}