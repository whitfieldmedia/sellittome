import React from 'react';
import { connect } from 'react-redux';
import { addMake, addIndex, showError } from '../redux/Form';
import { getMakes } from '../redux/Year';

class Makes extends React.Component {
    componentDidMount() {
        this.props.getMakes(this.props.form.year)
    }
    handleClick = e => {
        if(e.target.value.length > 0) {
            this.props.addMake(e.target.value)
            var index = this.props.form.index + 1;
            this.props.addIndex(index);
        } else {
            this.props.showError(true)
        }
    }
    mapMakes = () => {
        if(this.props.years.result.length > 0) {
            return (
                this.props.years.result.map((make, index) => (
                    <option className="option" key={index} value={make.make} onClick={this.handleClick}> {make.make} </option>
                ))
            )
        }
    }
    render() {
        return (
            <div className="option-container">
                {this.mapMakes()}
            </div>
        )
    }
}

export default connect(state => state, { addMake, getMakes, addIndex, showError })(Makes);