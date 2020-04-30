import React from 'react';

export default class SongItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        e.preventDefault();
        
    }

    render() {
        return (
            <div className="song-item-container">
                <audio src={this.props.song.musicUrl} id={`audio-${this.props.i}`}></audio>
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
                        <canvas className="canvas" id={`canvas-${this.props.i}`}>

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