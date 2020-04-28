import React from 'react'
import { Route } from "react-router-dom"


class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    // update(value) {
    //     return e => {
    //         this.setState({ [value]: e.currentTarget.value })
    //     }
    // }

    handleClick(e) {
        e.preventDefault();
        console.log("TEST")
        this.props.logout();
    }

    render() {
        if (this.props.currentUser){
            return(
                <div>
                    <button onClick={this.handleClick}>Logout</button>
                    <header>
                        <nav>
                            <ul className="navbar-list">
                                <li className="navbar-list-item logo"><a href="#"><i className="fas fa-water"></i><i
                                    className="fas fa-cloud"></i></a></li>
                                <li className="navbar-list-item home"><a href="#">Home</a></li>
                                <li className="navbar-list-item playlist"><a href="#">Playlist</a></li>

                                <li>
                                    <div className="search-zoom">
                                        <input className="search-bar" type="text" placeholder="Search" />
                                        <a className="search-button" href="#"><i className="fas fa-search"></i></a>
                                    </div>
                                </li>

                                <li className="navbar-list-item upload"><a href="#">Upload</a></li>
                                <li><img className="profile-picture" src="./images/unknown-profile.png" alt="avatar" /></li>
                                <li className="navbar-list-item profile">
                                    <p><span><a href="#">Elydium</a></span> ↯</p>
                                </li>
                                <li><a href="#"><i className="fas fa-ellipsis-h"></i></a></li>

                            </ul>
                        </nav>
                    </header>
                </div>
            )
        }else{
            return null;
        }
    }
}

export default NavBar;