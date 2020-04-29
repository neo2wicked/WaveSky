import React from 'react';

export default class SongForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {title: "", file: null}
        this.handleClick = this.handleClick.bind(this)
        this.handleFile = this.handleFile.bind(this)
    }

    handleClick(e) {
        e.preventDefault();
    }

    update(value){
        e => (this.setState({[value]: e.currentTarget.value}))
    }

    render() {
        return (
            <div>
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

                {this.props.songs.map((song)=>(
                  <div>
                      <span>{song.title}</span>
                      <audio src={song.musicUrl}></audio>
                  </div>  
                ))}
            </div>
        )
    }
}