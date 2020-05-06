import React from 'react';
import { Link } from 'react-router-dom';

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
    printCommentImage(comment){
        if (comment.profilePhoto){
            return comment.profilePhoto
        }else{
            return "https://www.unitedfamilies.org/wp-content/uploads/2015/09/unknown.png"
        }
    }

    render() {
        return (
            <div className="show-page-comments-section" >
                
                {this.props.comments.map((comment, i) => (
                    <div key={`comment-${this.props.song.id}-${i}`} className= "show-page-each-comment-content"> 
                        <img className="show-page-each-comment-image" src={this.printCommentImage(comment)} alt=""/>
                        <div className="show-page-comment-username-text">
                            <div className="show-page-comment-username"><Link to={`/${comment.username}`}>{comment.username}</Link></div>
                            <div className="show-page-comment-text">{comment.body}</div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}