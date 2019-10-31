import React from 'react';
import { connect } from 'react-redux';
import { addFiles } from '../redux/Form';

class UploadFiles extends React.Component {
    constructor() {
        super()
        this.state = {
            files: []
        }
    }

    showWidget = (e) => {
        e.preventDefault();
        let widget = window.cloudinary.createUploadWidget({ cloudName: 'duw9diprk', uploadPreset: 'my_preset'}, 
        (error, result) => {
            if (!error && result && result.event === "success") {
                 this.setState({
                     files: [ ...this.state.files, result.info.secure_url]
                 })
                 this.props.addFiles( this.state.files )
                }
        })
        widget.open()
    }

    deleteFile = (url) => {
        var array = this.state.files.filter(file => file !== url)
        this.setState({ files: array })
    }
    render() {
        return (
            <div className="file-upload-page">
                <div className="upload-photos-box"> 
                    <div className="upload-button" onClick={this.showWidget}> Choose files </div>
                </div>
                    <div className="thumbnail-container">
                        <p> *Click to delete photos </p>                        
                        {this.state.files.map(file => (
                        <div className="file-thumbnail-holder" key={file} onClick={() => this.deleteFile(file)}> 
                            <img src={file} className="file-thumbnail" alt="uploaded File" /> 
                            <i className="fas fa-minus-circle delete-thumbnail"></i> 
                            </div>)
                            )
                        }
                </div> 
            </div>
        )
    }
}

export default connect(state => state, { addFiles })(UploadFiles);