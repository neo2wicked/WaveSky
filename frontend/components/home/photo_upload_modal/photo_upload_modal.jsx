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
            formData.append('user[profile_background]', this.props.backgroundImage);
        }


        this.props.updateUsersPhotos({user: this.props.currentUser, form: formData})

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
                        <button onClick={()=>this.props.cancelUpload()} className="photo-upload-modal-content-buttons-cancel">Cancel</button>
                        <button onClick={this.handleClick} className="photo-upload-modal-content-buttons-save">Save</button>
                    </div>
                    <div className="photo-errors">
                        {this.props.errors.map((error, i)=>(
                            <li key={`photo-error-${i}`}>{error}</li>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
    

export default PhotoUploadModal;