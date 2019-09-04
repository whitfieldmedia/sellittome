import React from 'react';
import { connect } from 'react-redux';
import { addMake, addIndex } from '../redux/Form';
import { getModels } from '../redux/Year';

class Makes extends React.Component {
    handleClick = e => {
        this.props.addMake(e.target.value)
        this.props.getModels(this.props.form.year, e.target.value)
        var index = this.props.form.index + 1;
        this.props.addIndex(index);
    }
    render() {
        return (
            <div className="option-container">
                {this.props.years.result.map(make => (
                    <option className="option" key={make.make} value={make.make} onClick={this.handleClick}> {make.make} </option>
                ))}
            </div>
        )
    }
}

export default connect(state => state, { addMake, getModels, addIndex })(Makes);