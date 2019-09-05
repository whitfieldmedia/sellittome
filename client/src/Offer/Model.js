import React from 'react';
import { connect } from 'react-redux';
import { addModel, addIndex } from '../redux/Form';
import { getModels } from '../redux/BlackValue';

class Model extends React.Component {
    componentDidMount() {
        this.props.getModels(this.props.form.year, this.props.form.make)
    }
    handleClick = e => {
        e.preventDefault();
        this.props.addModel(e.target.value);
        var index = this.props.form.index + 1;
        this.props.addIndex(index);
    }
    mapModels = () => {
        if(this.props.blackValue.drilldown.class_list.map(list => list.year_list.map(year => year.make_list.length > 0))) {
            return (
                this.props.blackValue.drilldown.class_list.map(list => list.year_list.map(year => year.make_list.map(make => make.model_list.map(model => (
                    <option className="option" onClick={this.handleClick} key={model.name} value={model.name} name="model"> {model.name} </option>
                )))))
            )
        }
    }
    render() {
        console.log("Model: ", this.props)
        return (
            <div className="option-container">
                {this.mapModels()}
            </div>
        )
    }
}

export default connect(state => state, { addModel, getModels, addIndex })(Model)