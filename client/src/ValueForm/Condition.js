import React from 'react';
import { connect } from 'react-redux';
import { addCondition } from '../redux/Form';

class Condition extends React.Component {
    handleChange = (e) => {
        e.preventDefault();
        this.props.addCondition(e.target.value)
    }
    render() {
        return (
            <div className="form-radio-column">
                <div className="form-radio-row">
                    <label className="radio-label" htmlFor="condition"> 
                        <input className="radio-input" onChange={this.handleChange} type="radio" value="clean" name="condition" /> 
                        Clean 
                    </label>
                </div>
                <div className="form-radio-row">
                    <label className="radio-label" htmlFor="condition"> 
                        <input className="radio-input" onChange={this.handleChange} type="radio" value="average" name="condition" /> 
                        Average 
                    </label>
                </div>
                <div className="form-radio-row">
                    <label className="radio-label" htmlFor="condition"> 
                        <input className="radio-input" onChange={this.handleChange} type="radio" value="rough" name="condition"/> 
                        Rough 
                    </label>
                </div>
            </div>
        )
    }
}

export default connect(state => state, { addCondition })(Condition);