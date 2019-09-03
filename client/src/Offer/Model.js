import React from 'react';
import { connect } from 'react-redux';
import { addModel } from '../redux/Form';
import { getBlackTrims } from '../redux/BlackTrims';

class Model extends React.Component {
    componentDidUpdate() {
        if(this.props.form.model.length > 0) {
            this.props.getBlackTrims(this.props.form.year, this.props.form.make, this.props.form.model)
            this.props.handleNext()
        }
    }
    handleClick = e => {
        e.preventDefault();
        this.props.addModel(e.target.value);
    }
    mapModels = () => {
        if(this.props.blackModels.drilldown.class_list.length > 0) {
            return (
                this.props.blackModels.drilldown.class_list.map(list => list.year_list.map(year => year.make_list.map(make => make.model_list.map(model => (
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

export default connect(state => state, { addModel, getBlackTrims })(Model)