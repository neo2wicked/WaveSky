import React from 'react'
import { Route, Link } from "react-router-dom"


class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            home: "active-page",
            upload: "",
            displayFirstDropdown: "none",
            displaySecondDropdown: "none",
        }
        this.handleCurrentPage = this.handleCurrentPage.bind(this)
        this.openFirstDropdown = this.openFirstDropdown.bind(this)
        this.openSecondDropdown = this.openSecondDropdown.bind(this)
    }

    componentDidUpdate(){

    }

   

    componentDidMount(){
        

    }

    handleClick(e) {
        e.preventDefault();
        this.props.logout();
    }
    openFirstDropdown(){
        if (this.state.displayFirstDropdown === "none") {
            this.setState({ displayFirstDropdown: "block" });
        }else{
            this.setState({ displayFirstDropdown: "none" });
        }
    }
    openSecondDropdown(){
        if (this.state.displaySecondDropdown === "none") {
            this.setState({ displaySecondDropdown: "block" });
        }else{
            this.setState({ displaySecondDropdown: "none" });
        }
    }

    renderAvatar(){
        if (this.props.currentUser.profilePhoto){
            return <img className="profile-picture" src={this.props.currentUser.profilePhoto} alt="avatar" />
        }else{
            return <img className="profile-picture" src="https://www.unitedfamilies.org/wp-content/uploads/2015/09/unknown.png" alt="avatar" />
        }
    }
    handleCurrentPage(page){
        this.setState({home: "", upload: ""})
        this.setState({[page]: "active-page"})
    }

    render() {
        return(
            <div>
                {/* <button onClick={this.handleClick}>Logout</button> */}
                <header>
                    <nav>
                        <ul className="navbar-list">
                            <li className="navbar-list-item logo"><Link to={`/${this.props.currentUser.username}`}><i className="fas fa-water"></i><i
                                className="fas fa-cloud"></i></Link></li>
                            <li onClick={() => this.handleCurrentPage("home")} className={`navbar-list-item home ${this.state.home}`}><Link to={`/${this.props.currentUser.username}`}>Home</Link></li>
                            <li className="navbar-list-item playlist"><a href="#">Playlist</a></li>

                            <li>
                                <div className="search-zoom">
                                    <input className="search-bar" type="text" placeholder="Search" />
                                    <a className="search-button" href="#"><i className="fas fa-search"></i></a>
                                </div>
                            </li>

                            <li onClick={() => this.handleCurrentPage("upload")} className={`navbar-list-item upload ${this.state.upload}`}><Link to="/upload">Upload</Link></li>
                            
                            <li className="navbar-list-item" onClick={this.openFirstDropdown}>
                                <div className="profile">
                                    {this.renderAvatar()}

                                   <div class="username-box">
                                        <div className="username">ELydiumnfkjkdhfjh</div>
                                        <div className="arrow">↯</div>
                                   </div>
                                </div>

                                <div className="dropdown-menu-1"  style={{ display: this.state.displayFirstDropdown }} >
                                    <div><Link to={`/${this.props.currentUser.username}`}>Profile</Link></div>
                                    <div><Link>Likes(not working)</Link></div>
                                    <div><Link>Following(not working)</Link></div>
                                </div>
                            
                            </li>
                            <li onClick={this.openSecondDropdown} className="dropdown-2" >
                                <a href="#"><i className="fas fa-ellipsis-h"></i></a>
                                <div className="dropdown-menu-2" style={{ display: this.state.displaySecondDropdown }}>
                                    <div><Link onClick={this.handleClick}>Logout</Link></div>
                                </div>
                            </li>

                        </ul>
                    </nav>
                </header>
            </div>
        )
    }
}

export default NavBar;