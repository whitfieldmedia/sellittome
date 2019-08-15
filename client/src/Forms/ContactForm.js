import React from 'react';
import axios from 'axios';

class ContactForm extends React.Component {
    constructor() {
        super()
        this.state = {
            files: [],
            name: '',
            email: '',
            phone: '',
            description: ''
        }
    }
    showWidget = e => {
        e.preventDefault();
        let widget = window.cloudinary.createUploadWidget({
            cloudName: 'duw9diprk',
            uploadPreset: 'my_preset'
        }, (error, result) => {
            if (!error && result && result.event === "success") { 
                console.log('Done! Here is the image info: ', result.info.secure_url); 
                this.setState({
                    files: [...this.state.files, result.info.secure_url]
                })
              }
        })
        widget.open()
    }
    handleSubmit = e => {
        e.preventDefault();
        let email = {
            name: this.state.name,
            from: this.state.email,
            description: this.state.description,
            phone: this.state.phone,
            files: this.state.files
        }
        return axios.post('http://localhost:5800/send', email)
    }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    render() {
        return (
            <div>
                <div> 
                    <button onClick={this.showWidget}> Upload Photos </button>
                </div>
                <form onSubmit={this.handleSubmit} method="POST" className="email-form">
                    <div className="form-row">
                        <input type="text" name="name" className="input" placeholder="NAME*" value={this.state.name} onChange={this.handleChange} />
                    </div>
                    <div className="form-row">
                        <input type="text" name="email" className="input" placeholder="EMAIL*" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="form-row">
                        <input type="text" name="phone" className="input" placeholder="PHONE NUMBER" value={this.state.phone} onChange={this.handleChange} />
                    </div>
                    <div className="form-row">
                        <input type="text" name="description" className="input" placeholder="DESCRIPTION*" value={this.state.description} onChange={this.handleChange} />
                    </div>
                    <button> Submit </button>
                </form>
            </div>
        )
    }
}

export default ContactForm;