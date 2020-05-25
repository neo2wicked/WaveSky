import React from 'react';
import { Link } from 'react-router-dom';

export default class SongSingleComment extends React.Component {
    constructor(props) {
        super(props)
        this.showTrash = this.showTrash.bind(this)
        this.hideTrash = this.hideTrash.bind(this)
        this.state = {
            showTrash: false
        }
        this.deleteComment = this.deleteComment.bind(this)
    }

    printCommentImage(comment) {
        if (comment.profilePhoto) {
            return comment.profilePhoto
        } else {
            return "https://i.imgur.com/qItJfVP.png"
        }
    }

    showTrash(e) {
        this.setState({ showTrash: true })
    }

    hideTrash() {
        this.setState({ showTrash: false })
    }

    deleteComment() {
        this.props.deleteComment(this.props.comment.id)
    }

    render() {
        return (
            <div onMouseEnter={this.showTrash} onMouseLeave={this.hideTrash} className="show-page-each-comment-content">
                <img className="show-page-each-comment-image" src={this.printCommentImage(this.props.comment)} alt="" />
                <div className="show-page-comment-username-text">
                    <div className="show-page-comment-username"><Link to={`/${this.props.comment.username}`}>{this.props.comment.username}</Link></div>
                    <div className="show-page-comment-text">{this.props.comment.body}</div>
                </div>
                {(this.props.comment.username === this.props.currentUser.username) && this.state.showTrash ? <button onClick={this.deleteComment} className="show-page-delete-comment"><i className="fas fa-trash-alt"></i></button> : null}
            </div>
        )
    }
}