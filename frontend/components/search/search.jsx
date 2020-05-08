import React from 'react';
import SongItem from "../home/song_item/song_item"
import PageBottom from "../home/page_bottom"

export default class Seach extends React.Component {
    constructor(props) {
        super(props)
        this.search = ""
    }

    componentDidMount() {
        let path = this.props.location.pathname.split("/")
        if (path.length != 3) {
            this.props.history.push("/")
        }
        this.search = path[2];
        this.props.requestSearch(path[2]);
        
    }

    handleClick() {
    }

    componentDidUpdate() {
        let path = this.props.location.pathname.split("/")
        if (path.length != 3) {
            this.props.history.push("/")
        }
        if(this.search !== path[2]){
            this.search = path[2]
            this.props.requestSearch(path[2]);
        }
    }


    render() {
        return (
            <div className="explore-container">
                <div className="explore-top-text">Search results:</div>
                <div className="explore-middle-container">
                    {this.props.songs.map((song) => {
                        console.log(song)
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
                                history={this.props.history}/>
                        }

                    })}
                    <PageBottom />
                </div>
            </div>
        )
    }
}