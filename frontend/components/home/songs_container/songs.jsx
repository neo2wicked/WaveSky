import React from 'react';
import SongItem from "../song_item/song_item"

export default class Songs extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.username)
        this.props.fetchUserSongs(this.props.match.params.username)
    }

    handleClick(e) {
    }

    componentDidUpdate() {
    }


    render() {
        return (
            <div className="home-songs-container" >
                {this.props.songs.map((song, i) => (
                    <SongItem 
                        song={song} 
                        user={this.props.user} 
                        i={i} 
                        receiveCurrentSong={this.props.receiveCurrentSong} 
                        currentSong = {this.props.currentSong}
                    />
                ))}
            </div>
        )
    }
}