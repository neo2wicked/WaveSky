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
        this.props.logout();
    }

    render() {
        if (this.props.currentUser){
            return(
                <div>
                    <button onClick={this.handleClick}>Logout</button>
                </div>
            )
        }else{
            return null;
        }
    }
}

export default NavBar;