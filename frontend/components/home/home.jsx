
import React from 'react';
import NavBarContainer from "../nav_bar/nav_bar_container"
// import SongFormContainer from './song_form/song_form_container';
import SongsContainer from "./songs_container/songs_container"

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        e.preventDefault();
    }
    renderImage(){
        if (this.props.user.profilePhoto) {
            return this.props.user.profilePhoto
        } else {
            return "https://www.unitedfamilies.org/wp-content/uploads/2015/09/unknown.png"
        }
    }
    render() {
        return (
            <div className="home-container">
                <div className="home-top">
                    <div className="home-photo-user">
                        <img className="home-profile-photo" src={this.renderImage()} alt="" />
                        <div className="home-page-welcome">
                            <div><span className="home-page-of">This is page of: </span><span className="home-profile-username">{this.props.user.username}</span></div>
                            <div className="home-welcome">Welcome!</div>
                        </div>
                    </div>
                    <img className="home-profile-background" src={this.props.user.profileBackground ? this.props.user.profileBackground : ""} alt=""/>
                </div>
                
                <SongsContainer/>
                
            </div>
        )
    }
}