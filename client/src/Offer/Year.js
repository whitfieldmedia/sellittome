import React from 'react';
import { connect } from 'react-redux';
import { addYear, addIndex, emailSent, showError } from '../redux/Form';

class Year extends React.Component {
    constructor() {
        super();
        this.state = {
            year: ''
        }
    }
    componentDidMount() {
        if(this.state.year.length === 0 && this.props.form.year.length === 4) {
            this.props.emailSent(false)
            return this.setState({ year: this.props.form.year })
        } 
    }
    componentDidUpdate() {
        if(this.props.form.year.length === 4 && this.props.form.year !== this.state.year && this.props.form.year > 1980 && this.props.form.year < 2021) {
            setTimeout(
                function() {
                    var index = (this.props.form.index + 1)
                    this.props.showError(false)
                    this.props.addIndex(index);
                }.bind(this), 1000)
        }
    }

    componentWillUnmount() {
        clearTimeout()
    }
    handleChange = (e) => {
        this.props.addYear(e.target.value)
    }
    handleVin = () => {
        this.props.addIndex(0);
    }

    render() {
        return (
            <div className="input-container">
                <input 
                    type="number" 
                    maxLength="4"
                    value={this.props.form.year} 
                    onChange={this.handleChange}
                    name="year" 
                    placeholder="Must be 4 digits"
                    className="offer-input" 
                    />    
            </div>
        )
    }
}

export default connect(state => state, { addYear, addIndex, emailSent, showError })(Year)