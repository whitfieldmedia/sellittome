import React from 'react';
import './assets/scss/dropzone.scss';

class Dropzone extends React.Component {
    constructor(props) {
        super(props)
        this.fileInputRef = React.createRef();
        this.state = { highlight: false }
    }

    openFileDialog = () => {
        if (this.props.disabled) return;
        this.fileInputRef.current.click();
    }

    onFilesAdded = (evt) => {
        if (this.props.disabled) return;
        const files = evt.target.files;
        if(this.props.onFilesAdded) {
            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
        }
    }

    fileListToArray = (list) => {
        const array = [];
        for (var i = 0; i < list.length; i++) {
            array.push(list.item(i))
        }
        return array;
    }

    onDragOver = (evt) => {
        evt.preventDefault();
        if(this.props.disabled) return;
        this.setState({ highlight: true })    
    }

    onDragLeave = () => {
        this.setState({ highlight: false })
    }

    onDrop = (e) => {
        e.preventDefault();
        if(this.props.disabled) return;
        const files = e.dataTransfer.files;
        if(this.props.onFilesAdded) {
            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
        }
        this.setState({ highlight: false })
    }

    render() {
        return (
            <div 
                className={`Dropzone ${this.state.highlight ? "Highlight" : ""}`} 
                onDragOver={this.onDragOver} 
                onDragLeave={this.onDragLeave} 
                onDrop={this.onDrop} 
                onClick={this.openFileDialog} 
                style={{ cursor: this.props.disabled ? "default" : "pointer" }}
            >
                <input ref={this.fileInputRef} className="FileInput" type="file" multiple onChange={this.onFilesAdded} />
                <span> Upload Files </span>
            </div>
        )
    }
}

export default Dropzone;