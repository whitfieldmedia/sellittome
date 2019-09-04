import React from 'react';
import { connect } from 'react-redux';
import { addZip, addIndex } from '../redux/Form';

class Zip extends React.Component {
    constructor() {
        super()
        this.state = {
            zip: ''
        }
    }
    componentDidMount() {
        if(this.state.zip.length === 0 && this.props.form.zip.length === 5) {
            return this.setState({
                zip: this.props.form.zip
            })
        }
    }
    componentDidUpdate() {
        if(this.props.form.zip.length === 5) {
            if(this.props.form.zip !== this.state.zip) {
                var index = (this.props.form.index + 1);
                this.props.addIndex(index)
            }
        } 
    }
    handleChange = e => {
        this.props.addZip(e.target.value);
    }
    render() {
        return (
            <div className="input-container">
                <input type="number"
                    placeholder="5 Digit Number"
                    value={this.props.form.zip}
                    onChange={this.handleChange}
                    name="zip"
                    className="offer-input"
                    />
            </div>
        )
    }
}

export default connect(state => state, { addZip, addIndex })(Zip)