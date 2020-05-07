import React from 'react';
import SongItem from "../home/song_item/song_item"

export default class Explore extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.fetchRandomSongs();
    }

    handleClick() {
    }

    componentDidUpdate() {
    }


    render() {
        return (
            <div>
                <div>Explore new sounds and make friends!</div>
                <div>
                    {this.props.songs.map((song) => {
                        console.log(song)
                        if(song){
                            return <SongItem
                                key={`song-${song.username}-${song.id}`}
                                song={song}
                                i={song.id}
                                receiveCurrentSong={this.props.receiveCurrentSong}
                                currentSong={this.props.currentSong}
                                createDeleteLike={this.props.createDeleteLike}
                                currentUser={this.props.currentUser}
                                deleteSong={this.props.deleteSong} />
                        }
                })}
                </div>
            </div>
        )
    }
}