import React from 'react';
import SongSingleComment from "./song_single_comment"

export default (props) => {
    return (
        <div className="show-page-comments-section" >
            {Object.values(props.comments).reverse().map((comment, i) => (
                <SongSingleComment song={props.song} deleteComment={props.deleteComment} currentUser={props.currentUser} comment={comment} key={`comment-${props.song.id}-${i}`} />
            ))}
        </div>
    )
}