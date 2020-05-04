import React from "react"

class UserEditModal extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        const formData = new FormData();
        if (this.props.photoImage) {
            formData.append('user[profile_photo]', this.props.photoImage);
        }
        if (this.props.backgroundImage) {
            formData.append('user[profile_background]', this.props.backgroundImage);
        }


        this.props.updateUsersPhotos({ user: this.props.currentUser, form: formData })

    }
    printErrors(){

    }

    update(){

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
                                    {this.props.currentUser.profilePhoto ? <img src={this.props.currentUser.profilePhoto} alt="" /> : null}
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
                                        <input className="song-form-input" type="text" onChange={this.update("facebook")} required />
                                    </div>

                                    <div className="user-edit-text-field">
                                        <div>Instagram</div>
                                    <input className="song-form-input" type="text" onChange={this.update("instagram")} required />

                                    </div>

                                    <div className="user-edit-text-field">
                                        <div>Description</div>
                                        <textarea placeholder="Tell us more about yourself" className="user-description" cols="40" rows="10" onChange={this.update("description")}></textarea>
                                    </div>

                                    {/* {this.printErrors()} */}
                                </div>
                            </div>

                        </div>

                        <div className="song-form-bottom">
                            <div>(DO NOT PROVIDE YOUR REAL INFORMATION)</div>

                            <div>
                                <button onClick={()=> this.props.hideUserEditModal()} className="song-form-bottom-buttons song-form-cancel" >Cancel</button>
                                <button className="song-form-bottom-buttons song-form-save" onClick={this.handleClick}>Save</button>
                            </div>

                        </div>
                    </div>
                    
                    
                    
                    
                    
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
                {/* </div> */}
            </div>
        )
    }
}


export default UserEditModal;