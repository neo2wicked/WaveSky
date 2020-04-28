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

    render() {
        return (
            <div>
                {
                    this.props.errors.map((error, i) => (
                        <li key={`error-${i}`}>
                            {error}
                        </li>
                    ))}
                }
                <label>Username:
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={this.update('username')}
                    />
                </label>
                <label>Password:
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={this.update('password')}
                    />
                </label>
        <button onClick={this.handleClick}>{this.props.formType}</button>
            </div>
        )
    }
}

export default SessionForm;