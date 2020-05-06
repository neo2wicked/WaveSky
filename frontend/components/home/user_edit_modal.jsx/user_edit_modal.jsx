import React from "react"

class UserEditModal extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            facebook: "",
            instagram: "",
            description: "",
            image: null
        }
        this.handleFileImage = this.handleFileImage.bind(this)
        this.handleFileImageClick = this.handleFileImageClick.bind(this)
    }

    componentDidMount() {
        let info = {}
        if (this.props.user.facebook) {
            info = Object.assign(info, { facebook: this.props.user.facebook })
        }
        if (this.props.user.instagram) {
            info = Object.assign(info, { instagram: this.props.user.instagram })
        }
        if (this.props.user.description) {
            info = Object.assign(info, { description: this.props.user.description })
        }
        this.setState(info)
    }
    
    handleClick() {
        const formData = new FormData();
        let updatedUser = Object.assign({}, this.props.user, {facebook: this.state.facebook, instagram: this.state.instagram, description: this.state.description})
        
        formData.append('user[facebook]', this.state.facebook); 
        formData.append('user[instagram]', this.state.instagram); 
        formData.append('user[description]', this.state.description);
        if(this.state.image){
            formData.append('user[profile_photo]', this.state.image); 
        }


        this.props.updateUser({ user: updatedUser, form: formData })
            .then(() => this.props.history.push("/"))

    }
    printErrors(){

    }

    update(value) {
        return e => (this.setState({ [value]: e.currentTarget.value }))
    }

    handleFileImage(e){
        const image = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({ image, imageUrl: fileReader.result})

        };
        if (image) {
            fileReader.readAsDataURL(image);
        }

    }
    handleFileImageClick(){
        document.getElementById("song-form-image-file").click()
    }

    renderImage(){
        if (this.state.imageUrl){
            return this.state.imageUrl
        }
        if (this.props.user.profilePhoto){
            return this.props.user.profilePhoto
        }
        return "https://www.unitedfamilies.org/wp-content/uploads/2015/09/unknown.png"
    }

    render() {
        return (
            <div className="user-edit-modal">
                <div className="user-edit-modal-content">



                    {/* <div className="second-song-form"> */}

                        <div className="song-all-inputs">

                            <div className="basic-info">
                                User Info
                            </div>

                            <div className="user-edit-info">

                                <div className="image-preview">
                                    <img src={this.renderImage()} alt="" />
                                    <button onClick={this.handleFileImageClick} className="song-form-image-button"><i className="fas fa-camera"></i> Upload image</button>
                                    <input
                                        id="song-form-image-file"
                                        className="files"
                                        type="file"
                                        onChange={this.handleFileImage}
                                        
                                    />
                                </div>

                                <div className="user-edit-texts">
                                    <div className="user-edit-text-field">
                                        <div>Facebook</div>
                                        <input 
                                            className="song-form-input" 
                                            type="text" 
                                            value={this.state.facebook} 
                                            onChange={this.update("facebook")} 
                                            />
                                    </div>

                                    <div className="user-edit-text-field">
                                        <div>Instagram</div>
                                        <input 
                                            className="song-form-input"
                                            type="text" 
                                            value={this.state.instagram}
                                            onChange={this.update("instagram")} 
                                            />

                                    </div>

                                    <div className="user-edit-text-field">
                                        <div>Description</div>
                                        <textarea 
                                            placeholder="Tell us more about yourself" 
                                            className="user-description" 
                                            cols="40" 
                                            rows="10"
                                            value={this.state.description}
                                            onChange={this.update("description")}
                                            >
                                        </textarea>
                                    </div>

                                    {/* {this.printErrors()} */}
                                </div>
                            </div>

                        </div>

                    <div className="song-form-bottom user-edit-bottom">
                            <div>(DO NOT PROVIDE YOUR REAL INFORMATION)</div>

                            <div>
                                <button onClick={()=> this.props.hideUserEditModal()} className="song-form-bottom-buttons song-form-cancel" >Cancel</button>
                                <button className="song-form-bottom-buttons song-form-save" onClick={this.handleClick}>Save</button>
                            </div>

                    </div>
                    {/* </div> */}
                    
                    
                    
                    
                    
                    {/* <div className="photo-upload-modal-content-text">
                        <div>You are about to update your image.</div>
                        <div>Would you like to continue?</div>
                    </div>
                    <div className="photo-upload-modal-content-buttons" >
                        <button onClick={() => this.props.cancelUpload()} className="photo-upload-modal-content-buttons-cancel">Cancel</button>
                        <button onClick={this.handleClick} className="photo-upload-modal-content-buttons-save">Save</button>
                    </div>
                    <div className="photo-errors">
                        {this.props.errors.map((error, i) => (
                            <li key={`photo-error-${i}`}>{error}</li>
                        ))}
                    </div> */}
                </div>
            </div>
        )
    }
}


export default UserEditModal;