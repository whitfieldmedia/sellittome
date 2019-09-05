import React from 'react';
import { connect } from 'react-redux';
import { addModel, addIndex } from '../redux/Form';
import { getModels } from '../redux/Year';

class Models extends React.Component {
    componentDidMount() {
        this.props.getModels(this.props.form.year, this.props.form.make)
    }
    handleClick = e => {
        var model = e.target.value;
        this.props.addModel(model);
        var index = this.props.form.index + 1;
        this.props.addIndex(index);
    }
    mapModels = () => {
        if(this.props.years.result.map(res => res.model)) {
            return (
                this.props.years.result.map((model, index) => (
                    <option className="option" key={index} value={model.model} onClick={this.handleClick}> {model.model} </option>
                ))
            )
        }
    }
    render() {
        return (
            <div className="option-container">
                {this.mapModels()}
            </div>
        )
    }
}

export default connect(state => state, { addModel, addIndex, getModels })(Models)