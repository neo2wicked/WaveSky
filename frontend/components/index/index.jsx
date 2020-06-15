import React from 'react';
import FirstFormContainer from '../session/first_form_container'
import Carousel from "./carousel"
import SingleImage from './single-image'

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.songs = []
    }
    componentWillUnmount() {
        document.body.style.overflowY = "auto";
        document.body.style.overflowX = "auto";
        this.props.removeSongs()
    }

    componentDidMount() {
        this.props.fetchRandomNoInfoSongs();
    }

    handleClick(e) {
        e.preventDefault();

        document.getElementsByClassName("modal-form")[0].style.display = "block";
        document.body.style.overflowY = "hidden";
        document.body.style.overflowX = "hidden";
    }

    renderImage(song) {
        if (song.imageUrl) {
            return song.imageUrl
        } else {
            if (song.profilePhoto) {
                return song.profilePhoto
            } else {
                return "https://i.imgur.com/qItJfVP.png"
            }
        }
    }

    renderTrack(song, i) {
        if (song) {
            return (
                <div key={`song-index-${song.id}`} className="index-trending-single-track" onClick={this.handleClick}>
                    <SingleImage url={this.renderImage(song)} imageClass="track-img" />
                    {/* <img className="" src={} /> */}
                    <h4 onClick={this.handleClick}>{song.title}</h4>
                    <p onClick={this.handleClick} >{song.username}</p>
                </div>
            )
        } else {
            return (
                <div key={`song-index-non-${i}`} className="index-trending-single-track">
                    <div className="track-img" />
                    <h4>Comming soon</h4>
                    <p>Comming soon</p>
                </div>
            )
        }
    }

    renderAllTracks() {
        this.songs = []
        if (Object.keys(this.props.songs).length !== 0) {

            this.songs = this.songs.concat(this.props.songs)
            while (this.songs.length < 12) {
                this.songs.push(null)
            }
        }

        return this.songs.map((song, i) => (
            this.renderTrack(song, i)
        ))

    }
    render() {
        return (
            <div className="main-content">

                <FirstFormContainer />

                <div className="orange-line"></div>
                <div className="index-top-container">
                    <div className="index-top-container-text">
                        <i className="fas fa-water index-wave"></i>
                        <span> </span>
                        <i className="fas fa-cloud index-cloud"></i>
                        <span className="index-skywave">WAVESKY</span>
                    </div>
                    <div className="index-top-container-buttons">
                        <button onClick={this.handleClick} className="sign-in-button">Sign In</button>
                        <button onClick={this.handleClick} className="create-account-button">Create Account</button>
                    </div>
                </div>

                <Carousel handleClick={this.handleClick} />

                <div className="index-search-container">
                    <ul className="index-search">
                        <li><button onClick={this.handleClick} className="index-search-upload">Upload your own</button></li>
                    </ul>
                </div>

                <div className="index-trending-container">
                    <h3>Hear what people are listening to in the WaveSky community</h3>
                    <div className="index-trending-tracks">

                        {this.renderAllTracks()}

                        <button onClick={this.handleClick} className="index-trending-signup">Sign up now!</button>

                    </div>
                </div>
                <div className="orange-line"></div>

                <div className="index-container-other">
                    <div className="index-container-other-img">
                        <img src={window.apple} alt="" />
                    </div>
                    <div className="index-container-other-text">
                        <h3>Not mobile friendly</h3>
                        <div className="hr-line"></div>
                        <p>Unfortunately, we are not mobile friendly yet. Comming soon!</p>
                    </div>
                </div>

                <div className="index-container-singer">
                    <div className="index-container-singer-img">
                        <img src={window.singer} alt="singer" />
                    </div>
                    <div className="index-container-singer-text">
                        <div className="index-container-singer-text-single">
                            <button className="index-singer-signup" onClick={this.handleClick}>Sign Up!</button>
                        </div>

                        <div></div>

                        <div className="index-container-singer-text-single">
                            <h3>Music brings the joy!</h3>
                            <p>We are always in need of something new and special.
                            <br />Our community will make sure that you receive all the love you deserve!</p>
                        </div>
                    </div>
                </div>

                <div className="index-container-bottom">
                    <div className="index-container-bottom-text">
                        <h3>Thanks for listening. Now join in.</h3>
                        <p>Save tracks, follow artists and build playlists. All for free.</p>
                        <div>
                            <button onClick={this.handleClick} className="index-container-bottom-button">Create Account</button>
                        </div>

                        <div className="index-container-bottom-signin-container">
                            <span>Already have an account?</span>
                            <button onClick={this.handleClick} className="index-container-bottom-button-signin">Sign in</button>
                        </div>
                    </div>
                </div>

                <hr />
                <div className="index-container-footer">
                    <ul className="index-footer-list">
                        <li><a href="https://iskrayev.com" target="_blank">About us</a></li>
                        <li>-</li>
                        <li><a onClick={this.handleClick}>Sign in</a></li>
                        <li>-</li>
                        <li><a onClick={this.handleClick}>Sing up</a></li>
                        <li>-</li>
                        <li><a href="https://github.com/iskraev/WaveSky" target="_blank">GitHub</a></li>
                        <li>-</li>
                        <li><a href="https://www.linkedin.com/in/iskrayev/" target="_blank">LinkedIn</a></li>
                    </ul>

                    <p className="last-item"> Created by Dias Iskrayev</p>

                </div>
            </div>
        )
    }
}



