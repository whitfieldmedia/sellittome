import React from 'react';
import { connect } from 'react-redux';
import { addYear, addIndex } from '../redux/Form';
import { getBlackMakes } from '../redux/BlackCar';

class Year extends React.Component {
    constructor() {
        super();
        this.state = {
            year: ''
        }
    }
    componentDidMount() {
        if(this.state.year.length === 0 && this.props.form.year.length === 4) {
            return this.setState({
                year: this.props.form.year
            })
        } 
    }
    componentDidUpdate() {
        if(this.props.form.year.length === 4) {
            if(this.props.form.year !== this.state.year || this.props.blackModels.drilldown.class_list.length === 0) {
                this.props.getBlackMakes(this.props.form.year);
                var index = (this.props.form.index + 1)
                this.props.addIndex(index)
            }
        }
    }
    handleChange = (e) => {
        this.props.addYear(e.target.value)
    }
    render() {
        console.log(this.props)
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

export default connect(state => state, { addYear, getBlackMakes, addIndex })(Year)