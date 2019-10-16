import React from 'react'

function SignupForm(props) {
    return (
        <div className="form-wrapper">
            <form onSubmit={props.handleSubmit}>
                <h3 className="login-title">Sign Up</h3>
                <div className="login-form-container">
                    <input onChange={props.handleChange}
                        value={props.username}
                        name="username"
                        type="text"
                        placeholder="Username"/>
                    <input onChange={props.handleChange}
                        value={props.password}
                        name="password"
                        type="password"
                        placeholder="Password"/>
                    <button type="submit">Create Account</button>
                </div>
            </form>
        </div>
    )
}

export default SignupForm