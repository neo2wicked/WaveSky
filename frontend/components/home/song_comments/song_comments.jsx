import React from 'react';
import { Link } from 'react-router-dom';
import SongSingleComment from "./song_single_comment"

export default class SongComments extends React.Component {
    constructor(props) {
        super(props)
       
    }

    componentDidMount() {
        // this.props.fetchUser(this.props.match.params.username)
        // this.props.fetchUserSongs(this.props.match.params.username)
    }

    handleClick(e) {
    }

    componentDidUpdate() {
    }


    render() {
        return (
            <div className="show-page-comments-section" >
                {/* {console.log(this.props)} */}
                {Object.values(this.props.comments).reverse().map((comment, i) => (
                    <SongSingleComment song={this.props.song} deleteComment={this.props.deleteComment} currentUser={this.props.currentUser} comment={comment} key={`comment-${this.props.song.id}-${i}` }/>
                ))}
            </div>
        )
    }
}