import React from 'react';
import { connect } from 'react-redux';
import { addFiles } from '../redux/Form';

class Files extends React.Component {
    constructor() {
        super()
        this.state = {
            files: []
        }
    }
    //Cloudinary widget for file upload
    showWidget = e => {
        e.preventDefault();
        let widget = window.cloudinary.createUploadWidget({ cloudName: 'duw9diprk', uploadPreset: 'my_preset'}, 
        (error, result) => {
            if (!error && result && result.event === "success") {
                 console.log(result.info.secure_url)
                 this.setState({
                     files: [ ...this.state.files, result.info.secure_url]
                 })
                 this.props.addFiles( this.state.files )
                }
        })
        widget.open()
    }

    //Deletes file from array in state if user clicks on the file
    deleteFile = (url) => {
        var array = this.state.files.filter(file => file !== url)
        this.setState({ files: array })
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <div className="upload-photos-box"> 
                    <button className="upload-button" onClick={this.showWidget}> Choose files </button>
                </div>
                    <div className="thumbnail-container">
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

export default connect(state => state, { addFiles })(Files);