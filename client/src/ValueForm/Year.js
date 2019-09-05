import React from 'react';
import { connect } from 'react-redux';
import { addYear, addIndex, showError } from '../redux/Form';
import { getYears } from '../redux/Year';

class Year extends React.Component {
    componentDidMount() { this.props.getYears(); }

    handleClick = e => {
        if(e.target.value.length === 4) {
            this.props.addYear(e.target.value)
            var index = this.props.form.index + 1;
            this.props.addIndex(index);
        } else {
            this.props.showError(true)
        }
    }

    mapYears = () => {
        if(this.props.years.result.length > 0) {
            return ( 
                this.props.years.result.map((year, index) => (
                    <option className="option" onClick={this.handleClick} key={index} value={year.modelyear}> {year.modelyear} </option>
                ))
            )
        }
    }

    render() {
        console.log(this.props)
        return (
            <div className="option-container">
                {this.mapYears()}
            </div>
        )
    }
}

export default connect(state => state, { getYears, addYear, addIndex, showError })(Year)