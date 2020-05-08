
import React from 'react';
import NavBarContainer from "../nav_bar/nav_bar_container"
// import SongFormContainer from './song_form/song_form_container';
import SongsContainer from "./songs_container/songs_container"
import PhotoUploadModal from "./photo_upload_modal/photo_upload_modal"
import {Link} from "react-router-dom"
import UserEditModal from './user_edit_modal.jsx/user_edit_modal';
import PageBottom from "./page_bottom"

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            showPhotoButton: false,
            showBackgroundButton: false,
            photoImage: null,
            backgroundImage: null
        }
        this.showBackgroundButton = this.showBackgroundButton.bind(this)
        this.hideBackgroundButton = this.hideBackgroundButton.bind(this)
        this.showPhotoButton = this.showPhotoButton.bind(this)
        this.hidePhotoButton = this.hidePhotoButton.bind(this)

        this.handlePhotoImage = this.handlePhotoImage.bind(this)
        this.handleBackgroundImage = this.handleBackgroundImage.bind(this)

        this.updateUsersPhotos = this.updateUsersPhotos.bind(this)
        this.cancelUpload = this.cancelUpload.bind(this)

        this.showUserEditModal = this.showUserEditModal.bind(this)
        this.hideUserEditModal = this.hideUserEditModal.bind(this)

        this.handleFollow = this.handleFollow.bind(this)

        this.printFollowerButton = this.printFollowerButton.bind(this)

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

    showPhotoButton(){
        this.setState({ showPhotoButton: true })
    }
    hidePhotoButton(){
        this.setState({ showPhotoButton: false })
    }

    showBackgroundButton(){
        this.setState({showBackgroundButton: true})
    }
    hideBackgroundButton(){
        this.setState({showBackgroundButton: false})
    }

    handlePhotoImageClick() {
        let file = document.getElementById("home-photo-file")
        file.click()
    }
    handleBackgroundImageClick() {
        let file = document.getElementById("home-background-file")
        file.click()
    }
    
    handlePhotoImage(e){
        let image = e.currentTarget.files[0]
        this.setState({photoImage: image})

    }

    handleBackgroundImage(e){
        let image = e.currentTarget.files[0]
        this.setState({ backgroundImage: image })

    }
    componentDidUpdate(){
        
    }

    updateUsersPhotos(info){
        this.props.updateUser(info)
            .then(()=> {
                this.setState({photoImage: null, backgroundImage: null}); 
                this.props.history.push("/");
            })

    }

    renderButtonProfile(){
        return <button onClick={this.handlePhotoImageClick} className={this.state.showPhotoButton ? "home-photo-button home-button-show" : "home-photo-button"}><i className="fas fa-camera"></i> Upload image</button>
    }

    renderButtonBackground(){
        return <button onClick={this.handleBackgroundImageClick} className={this.state.showBackgroundButton ? "home-button-show home-background-button" : "home-background-button"}><i className="fas fa-camera"></i> Upload image</button>
    }
    cancelUpload(){
        document.getElementById("home-photo-file").value = "";
        document.getElementById("home-background-file").value = "";
        this.setState({
            photoImage: null,
            backgroundImage: null
        })
        this.props.clearUserErrors();
    }

    showUserEditModal(){
        this.setState({showUserEditModal: true})
    }

    hideUserEditModal(){
        this.setState({ showUserEditModal: false })
        this.props.clearUserErrors();

    }
    printSocialMedia(){
        if(this.props.user.instagram || this.props.user.facebook){
            return <div className="home-social-media">
                {this.props.user.facebook ? <a href={`http://${this.props.user.facebook}`}><i className="fab fa-facebook-f"></i> Facebook</a> : null}
                {this.props.user.instagram ? <a href={`http://${this.props.user.instagram}`}><i className="fab fa-instagram"></i> Instagram</a> : null}
            </div>
        }
    }

    handleFollow(){
            let user = this.props.user
            let userId = user.id;
            let currentUserId = this.props.currentUser.id
            let follower = { userId, follower: currentUserId }

            if (user.followers[currentUserId]) {
                delete user.followers[currentUserId]
            } else {
                user.followers[currentUserId] = { username: this.props.currentUser.username }
            }
            this.props.createDeleteFollower({ user, follower })
    }

    printFollowerButton(){
        if (this.props.currentUser.id !== this.props.user.id){
            if(this.props.user.followers){
                if (this.props.user.followers[this.props.currentUser.id]) {
                    return <button className="home-follow-button following" onClick={this.handleFollow}><i class="fas fa-user-check"></i><p>Following</p></button>
                } else {
                    return <button className="home-follow-button " onClick={this.handleFollow}><i class="fas fa-user-plus"></i><p>Follow</p></button>
                }
            }
        }
        
    }
    render() {
        return (
            <div className="home-container">
                {this.state.showUserEditModal ? <UserEditModal hideUserEditModal={this.hideUserEditModal} user={this.props.user} updateUser={this.props.updateUser} errors={this.props.imageErrors} history={this.props.history}/> : null}

                {this.state.photoImage || this.state.backgroundImage ? <PhotoUploadModal cancelUpload={this.cancelUpload} errors={this.props.imageErrors} backgroundImage={this.state.backgroundImage} photoImage={this.state.photoImage} currentUser={this.props.currentUser} updateUsersPhotos={this.updateUsersPhotos}/> : null}
                <div className="home-top">
                    <div className="home-photo-user">
                        <div className="home-photo-container" onMouseOver={this.showPhotoButton} onMouseOut={this.hidePhotoButton}>
                            <img onMouseOver={this.showPhotoButton} className="home-profile-photo" src={this.renderImage()} alt="" />
                            {this.props.currentUser.id === this.props.user.id ? this.renderButtonProfile() : null}
                            {this.props.currentUser.id === this.props.user.id ? <input
                                id="home-photo-file"
                                className="files"
                                type="file"
                                onChange={this.handlePhotoImage}
                            /> : null}
                        </div>
                        <div className="home-page-welcome">
                            <div className="home-profile-username">{this.props.user.username}</div>
                            {/* <div className="home-welcome">Welcome to my page!</div> */}
                        </div>
                    </div>
                    <div onMouseOver={this.showBackgroundButton} onMouseOut={this.hideBackgroundButton} className="home-profile-background">
                        <img className="home-background-image"  src={this.props.user.profileBackground ? this.props.user.profileBackground : ""} alt="" />
                        {this.props.currentUser.id === this.props.user.id ? this.renderButtonBackground() : null}
                        {this.props.currentUser.id === this.props.user.id ? <input
                            id="home-background-file"
                            className="files"
                            type="file"
                            onChange={this.handleBackgroundImage}
                        /> : null}
                    </div>
                </div>

                <div className="home-middle-container">
                    <div className="home-page-info-container">
                        <div className="home-page-info-container-all">All</div>

                        {this.props.currentUser.id === this.props.user.id ? <button className="home-profile-edit" onClick={this.showUserEditModal}><i className="fas fa-pencil-alt"></i>Edit</button> : null }
                        {this.printFollowerButton()}
                    </div>

                   <div className="home-songs-middle">
                        <div className="home-recent-songs-containers">

                            <div className="home-page-recent">Recent</div>


                            <SongsContainer />
                            {/* <PageBottom/> */}
                        </div>

                        <div className="home-right-panel-container">
                            <div className="home-right-panel-container-top">
                                <div className="home-right-panel-columns">
                                    <div className="home-right-panel-columns-followers">
                                        <div>Followers</div>
                                        <div className="home-right-panel-counters">{this.props.user.followers ? Object.values(this.props.user.followers).length : "-"}</div>
                                    </div>
                                    <div className="home-right-panel-columns-following">
                                        <div>Following</div>
                                        <div className="home-right-panel-counters">{this.props.user.followers ? Object.values(this.props.user.following).length : "-"}</div>
                                    </div>
                                    <div className="home-right-panel-columns-tracks">
                                        <div>Tracks</div>
                                        <div className="home-right-panel-counters">{this.props.songs ? Object.values(this.props.songs).length : "0"}</div>
                                    </div>
                                </div>

                                {this.props.user.description ? <div className="home-right-panel-description" >
                                    {this.props.user.description}
                                </div> : null}

                                {this.printSocialMedia()}

                            </div>


{/* 

                            <div>
                                like and other stuff
                            </div> */}
                        </div>
                   </div>
                </div>
                
            </div>
        )
    }
}