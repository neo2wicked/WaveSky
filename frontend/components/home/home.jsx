
import React from 'react';
import NavBarContainer from "../nav_bar/nav_bar_container"
// import SongFormContainer from './song_form/song_form_container';
import SongsContainer from "./songs_container/songs_container"
import PhotoUploadModal from "./photo_upload_modal/photo_upload_modal"

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

    handlePhotoImage(e){
        let image = e.currentTarget.files[0]
        this.setState({photoImage: image})

    }

    handleBackgroundImage(){

    }
    componentDidUpdate(){
        
    }

    updateUsersPhotos(user){
        this.props.updateUser(user)
            .then(()=> this.props.history.push("/"))

    }
    render() {
        return (
            <div className="home-container">

                {this.state.photoImage || this.state.backgroundImage ? <PhotoUploadModal backgroundImage={this.state.backgroundImage} photoImage={this.state.photoImage} currentUser={this.props.currentUser} updateUsersPhotos={this.updateUsersPhotos}/> : null}
                <div className="home-top">
                    <div className="home-photo-user">
                        <div className="home-photo-container" onMouseOver={this.showPhotoButton} onMouseOut={this.hidePhotoButton}>
                            <img onMouseOver={this.showPhotoButton} className="home-profile-photo" src={this.renderImage()} alt="" />
                            <button onClick={this.handlePhotoImageClick} className={this.state.showPhotoButton ? "home-photo-button home-button-show" : "home-photo-button"}><i className="fas fa-camera"></i> Upload image</button>
                            <input
                                id="home-photo-file"
                                className="files"
                                type="file"
                                onChange={this.handlePhotoImage}
                            />
                        </div>
                        <div className="home-page-welcome">
                            <div><span className="home-page-of">This is page of: </span><span className="home-profile-username">{this.props.user.username}</span></div>
                            <div className="home-welcome">Welcome!</div>
                        </div>
                    </div>
                    <div onMouseOver={this.showBackgroundButton} onMouseOut={this.hideBackgroundButton} className="home-profile-background">
                        <img  src={this.props.user.profileBackground ? this.props.user.profileBackground : ""} alt="" />
                        <button className={this.state.showBackgroundButton ? "home-button-show home-background-button" : "home-background-button"}><i className="fas fa-camera"></i> Upload image</button>
                        <input
                            id="home-background-file"
                            className="files"
                            type="file"
                            onChange={this.handleBackgroundImage}
                        />
                    </div>
                </div>
                <SongsContainer/>
                
            </div>
        )
    }
}