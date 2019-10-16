import React from 'react';

const LoginForm = props => {
    return (
        <div>
           <form onSubmit={props.handleSubmit}>
                <h3 className="login-header"> Log In </h3>   
                <div className="login-form-container">
                    <input 
                        type="text"
                        onChange={props.handleChange}
                        value={props.username}
                        name="username"
                        placeholder="username"
                    />
                    <input 
                        type="password"
                        onChange={props.handleChange}
                        value={props.password}
                        name="password"
                        placeholder="password"
                    />
                    <button className="login-submit-button"> Submit </button>
                </div>
            </form> 
        </div>
    )
}

export default LoginForm;