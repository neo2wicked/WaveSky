import React from 'react';

export default class SongDelete extends React.Component {
    constructor(props) {
        super(props)
       this.hideDelete = this.hideDelete.bind(this)
    }

    componentDidMount() {
        window.addEventListener("click", this.hideDelete)
    }
    componentWillUnmount(){
        window.removeEventListener("click", this.hideDelete)
    }

    hideDelete(e){
        let modal = document.getElementsByClassName("song-delete-modal")[0]
        if (e.target === modal){
            this.props.hideDelete()
        }
    }


    render() {
        return (
           
            <div className="song-delete-window" >
                <div className="song-delete-window-question">Delete song?</div>
                <div className="song-delete-window-buttons">
                    <button onClick={() => this.props.hideDelete()}>Cancel</button>
                    <button onClick={() => this.props.deleteSong()}>Yes</button>
                </div>
            </div>
        )
    }
}