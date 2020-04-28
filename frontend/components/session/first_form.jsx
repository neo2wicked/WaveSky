import React from 'react'
import LoginFormContainer from "./login_form_container"
import SignupFormContainer from './signup_form_container'
import { Route } from "react-router-dom"


class FirstForm extends React.Component{
    constructor(props){
        super(props)
        this.state = { username: "", form: null}
        this.handleClick = this.handleClick.bind(this)
    }

    update(value){
        return e => {
            this.setState({[value]: e.currentTarget.value})
        }
    }

    handleClick(e){
        e.preventDefault();
        this.props.fetchUserByUsername(this.state)
            .then(
            () => (this.setState({form: <LoginFormContainer username={this.state.username} />})),
            () => (this.setState({ form: <SignupFormContainer username={this.state.username}/> }))
        )

}

    render(){
        return(
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={this.state.username}
                    onChange={this.update('username')}
                />
                <button onClick={this.handleClick}>Continue</button>
                {this.state.form}
            </div>
        )
    }
}

export default FirstForm;