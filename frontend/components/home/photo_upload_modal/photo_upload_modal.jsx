import React from "react"

class PhotoUploadModal extends React.Component{
    constructor(props){
        super(props) 
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        const formData = new FormData();
        if (this.props.photoImage){
            formData.append('user[profile_photo]', this.props.photoImage);
        }
        if (this.props.backgroundImage){
            formData.append('user[background_photo]', this.props.backgroundImage);
        }

        this.props.updateUsersPhotos(formData)

    }
    
    render(){
        return(
            <div className="photo-upload-modal">
                <div className="photo-upload-modal-content">
                    <div className="photo-upload-modal-content-text">
                        <div>You are about to update your image.</div>
                        <div>Would you like to continue?</div>
                    </div>
                    <div className="photo-upload-modal-content-buttons" >
                        <button className="photo-upload-modal-content-buttons-cancel">Cancel</button>
                        <button onClick={this.handleClick} className="photo-upload-modal-content-buttons-save">Save</button>
                    </div>
                </div>
            </div>
        )
    }
}
    

export default PhotoUploadModal;