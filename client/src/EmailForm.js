import React from 'react';
import Dropzone from './Dropzone';
import Progress from './Progress';
import './assets/scss/form.scss';

class EmailForm extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            from: '',
            phone: '',
            description: '',
            attachments: {},
            files: [],
            uploading: false,
            uploadProgress: {},
            successfullUploaded: false
        }
        this.uploadFiles = this.uploadFiles.bind(this);
    }

    onFilesAdded = (files) => {
        this.setState(prevState => ({
            files: prevState.files.concat(files)
        }))
    }

    async uploadFiles() {
        this.setState({ uploadProgress: {}, uploading: true });
        const promises = [];
        this.state.files.forEach(file => {
            promises.push(this.sendRequest(file));
        })
        try {
            await Promise.all(promises);

            this.setState({ successfullUploaded: true, uploading: false })
        } catch (e) {
            console.log(e)
            this.setState({ successfullUploaded: true, uploading: false })
        }
    }


    sendRequest = file => {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            req.upload.addEventListener("progress", event => {
                if (event.lengthComputable) {
                    const copy = { ...this.state.uploadProgress };
                    copy[file.name] = {
                        state: "pending",
                        percentage: (event.loaded / event.total) * 100
                    }
                    this.setState({ uploadProgress: copy });
                }
            });

            req.upload.addEventListener("load", event => {
                const copy = { ...this.state.uploadProgress };
                copy[file.name] = { state: "done", percentage: 100 };
                this.setState({ uploadProgress: copy });
                resolve(req.response);
            })

            req.upload.addEventListener("error", event => {
                const copy = { ...this.state.uploadProgress };
                copy[file.name] = { state: "error", percentage: 0 };
                this.setState({ uploadProgress: copy });
                reject(req.response);
            });

            const formData = new FormData();
            formData.append("file", file, file.name);

            req.open("POST", "http://localhost:5000/upload");
            req.send(formData);
        })
    }

    renderProgress = file => {
        const uploadProgress = this.state.uploadProgress[file.name];
        if(this.state.uploading || this.state.successfullUploaded) {
            return (
                <div className="ProgressWrapper">
                    <Progress progress={uploadProgress ? uploadProgress.percentage : 0 } />

                </div>
            )
        }
    }

    renderActions = () => {
        if(this.state.successfullUploaded) {
            return (
                <button onClick={() => {
                    this.setState({ files: [], successfullUploaded: false })}}
                >
                Clear
                </button>
            );
        } else {
            return (
                <button disabled={this.state.files.length < 0 || this.state.uploading} onClick={this.uploadFiles}>
                    Upload
                </button>
            )
        }
    }

    sendEmail = (e) => {
        e.preventDefault();
        const email = {
            name: this.state.name,
            replyTo: this.state.from,
            phone: this.state.phone,
            description: this.state.description,
            images: this.state.attachments
        }
        console.log(email)
        fetch("/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: email
        }).then(response => response.json())
        this.setState({
            name: '',
            from: '',
            phone: '',
            description: '',
            attachments: {}
        })
    }
    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div id="form-page">
                {/* <form onSubmit={this.sendEmail} className="email-form"> */}
                    {/* <div className="form-row">
                        <input type="text" name="name" className="input" placeholder="NAME*" value={this.state.name} onChange={this.handleChange} />
                    </div> 
                    <div className="form-row">
                        <input type="text" name="from" className="input" placeholder="EMAIL*" value={this.state.from} onChange={this.handleChange} />
                    </div>
                    <div className="form-row">
                        <input type="number" name="phone" className="input" placeholder="PHONE" value={this.state.phone} onChange={this.handleChange} />
                    </div>
                    <div className="form-row">
                        <input type="text" name="description" className="input" placeholder="DESCRIPTION*" value={this.state.description} onChange={this.handleChange} />
                    </div> */}
                    <div className="form-row">
                        <Dropzone onFilesAdded={this.onFilesAdded} disabled={this.state.uploading || this.state.successfullUploaded} />
                    </div>
                    <div className="Files">
                        {this.state.files.map(file => {
                            return (
                                <div key={file.name} className="Row">
                                    <span className="Filename"> {file.name} </span>
                                    {this.renderProgress(file)}
                                </div>
                            )
                        })}
                    </div>
                    <div className="Actions"> {this.renderActions()} </div>
                    {/* <button> GET YOUR OFFER! </button> */}
                {/* </form> */}
            </div>
        )
    }
}

export default EmailForm