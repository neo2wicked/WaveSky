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

    componentDidMount(){
        let form = document.getElementsByClassName("modal-form")[0]
        form.addEventListener("click",(e)=>{
            if (e.target === form){
                form.style.display = "none";
                document.body.style.overflowX = "auto";
                document.body.style.overflowY = "auto";
            }
        }) 
    }

    update(value){
        return e => {
            this.setState({[value]: e.currentTarget.value})
        }
    }

    handleClick(e){
        e.preventDefault();
        let user = { username: this.state.username}
        if (user.username !== ""){
            document.getElementsByClassName("first-form")[0].style.display="none";
            this.props.fetchUserByUsername(user)
                .then(() => this.setState({ form: <LoginFormContainer username={this.state.username} />, username: "" }))
                .fail(() => this.setState({ form: <SignupFormContainer username={this.state.username} />, username: "" }))
        }
    }

    render(){
        return(
            <div className="modal-form" style={this.props.style}>
                <div className="close"><span>&times;</span></div>
                <div className="modal-form-content first-form">
                    <div className="modal-form-container">
                        <button className="demo-button">DEMO LOGIN</button>
                        <div className="separator">or</div>
                        
                        <input
                            className="modal-form-input"
                            placeholder="Your username"
                            type="text"
                            value={this.state.username}
                            onChange={this.update('username')}
                        />
                        <button className="modal-form-button" onClick={this.handleClick}>Continue</button>

                        <p className="modal-text">You do not need to enter your private information. You can use demo button to login and test the website. We respect your privacy.</p>

                        
                        
                    </div>
                </div>
                {this.state.form}

                
            </div>
        )
    }
}




export default FirstForm;