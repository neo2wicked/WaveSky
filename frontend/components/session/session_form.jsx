import React from 'react'

class SessionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { username: this.props.username, password: "" }
        this.handleClick = this.handleClick.bind(this)
    }

    update(value) {
        return e => {
            this.setState({ [value]: e.currentTarget.value })
        }
    }

    handleClick(e) {
        e.preventDefault();
        this.props.action(this.state)
    }


    formLogin(){
        return(
            <div className="modal-form-content">
                <div className="modal-form-container session-form">

                    <input
                        className="modal-form-input"
                        type="text"
                        value={this.state.username}
                        onChange={this.update('username')}
                    />
                    <input
                        className="modal-form-input"
                        placeholder="Your password"
                        type="password"
                        value={this.state.password}
                        onChange={this.update('password')}
                    />
                    {
                        this.props.errors.map((error, i) => (
                            <li key={`error-${i}`}>
                                {error}
                            </li>
                        ))}
                    <button className="modal-form-button" onClick={this.handleClick}>{this.props.formType}</button>

                    <p className="modal-text">You do not need to enter your private information. You can use demo button to login and test the website.</p>

                </div>
            </div>
        )
    }

    formSignup(){
        return(
            <div className="modal-form-content">
                <div className="modal-form-container session-form">

                    <h1>Create your WaveSky account</h1>
                    <input
                        className="modal-form-input"
                        type="text"
                        value={this.state.username}
                        onChange={this.update('username')}
                    />
                    <p>Choose a password</p>
                    <input
                        className="modal-form-input"
                        placeholder="Your password"
                        type="password"
                        value={this.state.password}
                        onChange={this.update('password')}
                    />
                    <ul className="errors">
                        {
                            this.props.errors.map((error, i) => (
                                <li key={`error-${i}`}>
                                    {error}
                                </li>
                        ))}
                    </ul>
                    <button className="modal-form-button" onClick={this.handleClick}>{this.props.formType}</button>

                    <p className="modal-text">You do not need to enter your private information. You can use demo button to login and test the website. We respect your privacy.</p>

                </div>
            </div>
        )
    }





    render() {
        if (this.props.formType === "Sign up"){
            return this.formSignup()
        }else{
            return this.formLogin();
        }                
    }
}

export default SessionForm;