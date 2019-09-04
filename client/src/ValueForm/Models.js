import React from 'react';
import { connect } from 'react-redux';
import { addModel, addIndex } from '../redux/Form';
import { getBodies } from '../redux/Year';

class Models extends React.Component {
    handleClick = e => {
        var model = e.target.value;
        this.props.addModel(model);
        this.props.getBodies(this.props.form.year, this.props.form.make, model);
        var index = this.props.form.index + 1;
        this.props.addIndex(index);
    }
    render() {
        return (
            <div className="option-container">
                {this.props.years.result.map(model => (
                    <option className="option" key={model.model} value={model.model} onClick={this.handleClick}> {model.model} </option>
                ))}
            </div>
        )
    }
}

export default connect(state => state, { addModel, addIndex, getBodies })(Models)