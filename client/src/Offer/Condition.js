import React from 'react';
import { connect } from 'react-redux';
import { addCondition, addIndex, showError } from '../redux/Form';

class Condition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clean: props.form.condition === "clean",
            average: props.form.condition === "average",
            rough: props.form.condition === "rough"
        }
    }

    componentDidUpdate(prevProps) {
        const form = this.props.form
        if((prevProps.form.condition !== form.condition) && form.condition.length > 0) {
            setTimeout(
                function() {
                    var index = (this.props.form.index + 1);
                    this.props.showError(false);
                    this.props.addIndex(index);
                }.bind(this), 500
            )
        }
    }
    componentWillUnmount() {
        clearTimeout();
    }
    handleClick = value => {
        return this.props.addCondition(value)
    }
    render() {
        return (
            <div className="form-radio-column">
                <div className="form-radio-row">
                    <div className="radio-label" htmlFor="condition" onClick={() => this.handleClick('clean')}> 
                        <span className={this.props.form.condition === 'clean' ? 'radio-circle radio-circle-active': 'radio-circle'}> {this.props.form.condition === 'clean' 
                            ?  <span className="inner-white-circle"></span>
                            : null}
                        </span>
                        Clean 
                    </div>
                </div>
                <div className="form-radio-row">
                    <label className="radio-label" htmlFor="condition" onClick={() => this.handleClick('average')}> 
                        <span className={this.props.form.condition === 'average' ? 'radio-circle radio-circle-active': 'radio-circle'}>
                            {this.props.form.condition === 'average' 
                            ? <span className="inner-white-circle"></span>
                            : null}
                        </span>
                        Average 
                    </label>
                </div>
                <div className="form-radio-row">
                    <div className="radio-label" htmlFor="condition" onClick={() => this.handleClick('rough')}> 
                        <span className={this.props.form.condition === 'rough' ? 'radio-circle radio-circle-active': 'radio-circle'}>
                            {this.props.form.condition === 'rough' 
                            ? <span className="inner-white-circle"></span>
                            : null}
                        </span>
                        Rough 
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state, { addCondition, addIndex, showError })(Condition);