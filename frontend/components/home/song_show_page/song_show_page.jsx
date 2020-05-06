import React from 'react';
import SongItemShow from "../song_item/song_item_show"

export default class SongShowPage extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchSong(this.props.match.params.songId)
            
        .then(()=> {
                if (this.props.song.username !== this.props.match.params.username){
                    this.props.history.push("/")
                }
            })
        .then(() => {this.props.fetchComments(this.props.match.params.songId)})
    }

    handleClick(e) {
    }

    componentDidUpdate() {
        // console.log(this.props.song)
    }


    render() {
        return (
            <div className="show-page-container" >
                {this.props.song ? 
                    <SongItemShow
                        song={this.props.song}
                        user={this.props.user}
                        i={this.props.song.id}
                        receiveCurrentSong={this.props.receiveCurrentSong}
                        currentSong={this.props.currentSong}
                        createDeleteLike={this.props.createDeleteLike}
                        currentUser={this.props.currentUser}
                    /> : null}
            </div>
        )
    }
}