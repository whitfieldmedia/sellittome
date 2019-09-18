import React from 'react';
import { connect } from 'react-redux';
import { addCondition, addIndex } from '../redux/Form';

class Condition extends React.Component {
    constructor() {
        super();
        this.state = {
            clean: false,
            average: false,
            rough: false
        }
    }
    componentDidMount() {
        const form = this.props.form;
        if(form.condition === 'clean') {
            this.setState({ clean: true, average: false, rough: false })
        } else if (form.condition === 'average') {
            this.setState({ clean: false, average: true, rough: false })
        } else if (form.condition === 'rough') {
            this.setState({ clean: false, average: false, rough: true })
        } else {
            this.setState({ clean: false, average: false, rough: false })
        }
    }
    componentDidUpdate(prevProps) {
        const form = this.props.form
        if((prevProps.form.condition !== form.condition) && form.condition.length > 0) {
            setTimeout(
                function() {
                    var index = (this.props.form.index + 1);
                    this.props.addIndex(index);
                }.bind(this), 500
            )
        }
    }
    componentWillUnmount() {
        clearTimeout();
    }
    handleClean = e => {
        this.setState({ clean: true, average: false, rough: false })
        this.props.addCondition('clean')
    }
    handleAverage = e => {
        this.setState({ average: true, clean: false, rough: false })
        this.props.addCondition('average')
    }
    handleRough = e => {
        this.setState({ rough: true, average: false, clean: false })
        this.props.addCondition('rough')
    }
    render() {
        return (
            <div className="form-radio-column">
                <div className="form-radio-row">
                    <label className="radio-label" htmlFor="condition"> 
                        <input onChange={this.handleClean} className="radio-input" type="radio" value={this.state.clean} name="condition" /> 
                        Clean 
                    </label>
                </div>
                <div className="form-radio-row">
                    <label className="radio-label" htmlFor="condition"> 
                        <input className="radio-input" onChange={this.handleAverage} type="radio" value={this.state.average} name="condition" /> 
                        Average 
                    </label>
                </div>
                <div className="form-radio-row">
                    <label className="radio-label" htmlFor="condition"> 
                        <input className="radio-input" onChange={this.handleRough} type="radio" value={this.state.rough} name="condition"/> 
                        Rough 
                    </label>
                </div>
            </div>
        )
    }
}

export default connect(state => state, { addCondition, addIndex })(Condition);