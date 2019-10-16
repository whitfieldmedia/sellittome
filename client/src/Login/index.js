import React from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { login } from '../redux/auth';
import '../assets/css/login.css';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            inputs: {
                username: "",
                password: ""
            }
        }
    }

    handleChange = e => {
        this.setState({
            inputs: {
                ...this.state.inputs,
                [e.target.name]: e.target.value
            }
        })
    }

    clearInputs() {
        this.setState({
            inputs: {
                username: "",
                password: ""
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.inputs);
        this.clearInputs();
    }
    render() {
        console.log(this.props)
        return (
            <LoginForm handleChange={this.handleChange} 
                handleSubmit={this.handleSubmit}
                errMsg={this.props.auth.authErrCode}
                {...this.state.inputs} />
        )
    }
}

export default connect(state => state, { login })(Login)