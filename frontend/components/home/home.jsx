
import React from 'react';
import FirstFormContainer from '../session/first_form_container'


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
            <div></div>
        )
    }
}