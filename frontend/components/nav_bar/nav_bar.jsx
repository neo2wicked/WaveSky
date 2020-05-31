import React from 'react'
import { Link } from "react-router-dom"

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            home: "active-page",
            upload: "",
            displayFirstDropdown: "none",
            displaySecondDropdown: "none",
            search: ""
        }
        this.openFirstDropdown = this.openFirstDropdown.bind(this)
        this.openSecondDropdown = this.openSecondDropdown.bind(this)
        this.closeAllDropDowns = this.closeAllDropDowns.bind(this)
        this.pages = { home: "", upload: "", explore: "" }
        this.handleSearch = this.handleSearch.bind(this)
    }

    componentDidMount() {
        window.addEventListener("click", this.closeAllDropDowns);
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.closeAllDropDowns);
    }

    closeAllDropDowns() {
        this.closeFirstDropdown()
        this.closeSecondDropdown();
    }

    closeFirstDropdown() {
        this.setState({ displayFirstDropdown: "none" })
    }
    closeSecondDropdown() {
        this.setState({ displaySecondDropdown: "none" })
    }

    handleClick(e) {
        e.preventDefault();
        this.props.logout();
    }

    openFirstDropdown(e) {
        e.stopPropagation()
        this.closeSecondDropdown()
        if (this.state.displayFirstDropdown === "none") {
            this.setState({ displayFirstDropdown: "block" });
        } else {
            this.setState({ displayFirstDropdown: "none" });
        }
    }

    openSecondDropdown(e) {
        e.stopPropagation()
        this.closeFirstDropdown()
        if (this.state.displaySecondDropdown === "none") {
            this.setState({ displaySecondDropdown: "block" });
        } else {
            this.setState({ displaySecondDropdown: "none" });
        }
    }

    renderAvatar() {
        if (this.props.currentUser.profilePhoto) {
            return <img className="profile-picture" src={this.props.currentUser.profilePhoto} alt="avatar" />
        } else {
            return <img className="profile-picture" src="https://i.imgur.com/qItJfVP.png" alt="avatar" />
        }
    }

    checkCurrentPage() {
        this.pages = { home: "", upload: "", explore: "" }
        let path = this.props.location.pathname.split("/")
        if (this.props.currentUser.username === path[1]) {
            this.pages["home"] = "active-page"
        }
        if (path[1] === "upload") {
            this.pages["upload"] = "active-page"
        }
        if (path[1] === "explore") {
            this.pages["explore"] = "active-page"
        }
    }

    handleSearch() {
        if (this.state.search.length !== 0) {
            this.props.history.push(`/search/${this.state.search}`)
        }
    }

    update(value) {
        return e => (this.setState({ [value]: e.currentTarget.value }))
    }

    render() {
        return (
            <header>
                {this.checkCurrentPage()}
                <nav>
                    <ul className="navbar-list">
                        <li className="navbar-list-item logo-box"><Link to={`/`}><div className="logo"><i className="fas fa-water"></i><i
                            className="fas fa-cloud"></i></div></Link></li>
                        <li className={`navbar-list-item home ${this.pages.home}`}><Link to={`/`}>Home</Link></li>
                        <li className={`navbar-list-item playlist ${this.pages.explore}`}><Link to="/explore">Explore</Link></li>

                        <li>
                            <div className="search-zoom">
                                <input className="search-bar" onChange={this.update("search")} type="text" placeholder="Search" />
                                <div className="search-button" onClick={this.handleSearch}><i className="fas fa-search"></i></div>
                            </div>
                        </li>

                        <li className={`navbar-list-item upload ${this.pages.upload}`}><Link to="/upload">Upload</Link></li>

                        <li className="navbar-list-item" onClick={this.openFirstDropdown}>
                            <div className="profile">
                                {this.renderAvatar()}

                                <div className="username-box">
                                    <div className="username">{this.props.currentUser.username}</div>
                                    <div className="arrow">↯</div>
                                </div>
                            </div>

                            <div className="dropdown-menu-1" style={{ display: this.state.displayFirstDropdown }} >
                                <div><Link to={`/`}>Profile</Link></div>
                                <div><a href="https://www.linkedin.com/in/iskrayev/" target="_blank">LinkedIn</a></div>
                                <div><a href="https://github.com/iskraev" target="_blank">GitHub</a></div>
                            </div>

                        </li>
                        <li onClick={this.openSecondDropdown} className="dropdown-2" >
                            <i className="fas fa-ellipsis-h"></i>
                            <div className="dropdown-menu-2" style={{ display: this.state.displaySecondDropdown }}>
                                <div onClick={this.handleClick}>Logout</div>
                            </div>
                        </li>

                    </ul>
                </nav>
                <div className="fake-header">
                </div>
            </header>
        )
    }
}

export default NavBar;