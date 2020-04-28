
import React from 'react';
import NavBarContainer from "../nav_bar/nav_bar_container"

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <NavBarContainer/>
                
            </div>
        )
    }
}