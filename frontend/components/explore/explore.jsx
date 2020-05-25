import React from 'react';
import SongItem from "../home/song_item/song_item"
import PageBottom from "../home/page_bottom"

export default class Explore extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchRandomSongs();
    }

    getNewSongs(){
        this.props.removeSongs();
        this.props.fetchRandomSongs();
    }

    render() {
        return (
            <div className="explore-container">
                <div className="explore-top-text">Explore new <span className="explore-sounds">sounds</span> and make friends!</div>
                <div className="explore-middle-container">
                    {this.props.songs.map((song) => {
                        if (song) {
                            return <SongItem
                                key={`song-${song.username}-${song.id}`}
                                song={song}
                                i={song.id}
                                receiveCurrentSong={this.props.receiveCurrentSong}
                                currentSong={this.props.currentSong}
                                createDeleteLike={this.props.createDeleteLike}
                                currentUser={this.props.currentUser}
                                deleteSong={this.props.deleteSong}
                                history={this.props.history} />
                        }
                    })}
                    <button onClick={this.getNewSongs.bind(this)} className="explore-button">Explore more!</button>
                    <PageBottom />
                </div>
            </div>
        )
    }
}