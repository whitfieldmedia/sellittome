import React from 'react';
import { connect } from 'react-redux';
import { addModel, addIndex, showError } from '../redux/Form';
import { getModels } from '../redux/BlackValue';

class Model extends React.Component {
    constructor() {
        super();
        this.state = {
            model: '',
            isLoaded: false
        }
    }
    componentDidMount() {
            this.props.getModels(this.props.form.year, this.props.form.make);
    }
    componentDidUpdate() {
        try {
            if(this.props.blackValue.drilldown.class_list.map(list => list.year_list.map(year => year.make_list.length > 0)) && !this.state.isLoaded) {
                this.setState({
                    isLoaded: true
                })
            }
        } catch(err) {
            console.log(err);
        }
    }
    componentWillUnmount() {
        clearTimeout();
    }
    handleClick = model => {
        this.props.addModel(model);
        setTimeout(
            function() {
                var index = this.props.form.index + 1;
                this.props.showError(false)
                this.props.addIndex(index);
            }.bind(this), 500
        )
    }
    mapModels = () => {
        if(this.props.blackValue.drilldown.class_list.map(list => list.year_list.map(year => year.make_list.length > 0))) {
            return (
                this.props.blackValue.drilldown.class_list.map(list => list.year_list.map(year => year.make_list.map(make => make.model_list.map(model => (
                    <button className="option" onClick={() => this.handleClick(model.name)} key={model.name} value={model.name} name="model"> {model.name} <span className={(this.props.form.model === model.name) ? "option-selected" : "not-selected"}>&#10003;</span> </button>
                )))))
            )
        }
    }
    render() {
        return (
            <div className="option-container">
                {this.state.isLoaded
                ? this.mapModels()
                : null}
            </div>
        )
    }
}

export default connect(state => state, { addModel, getModels, addIndex, showError })(Model)