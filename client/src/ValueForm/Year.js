import React from 'react';
import { connect } from 'react-redux';
import { addYear, addIndex } from '../redux/Form';
import { getYears, getMakes } from '../redux/Year';

class Year extends React.Component {
    componentDidMount() {
        this.props.getYears();
    }
    handleClick = e => {
        this.props.addYear(e.target.value)
        this.props.getMakes(e.target.value)
        var index = this.props.form.index + 1;
        this.props.addIndex(index);
    }

    render() {
        console.log(this.props)
        return (
            <div className="option-container">
                {this.props.years.result.map(year => (
                    <option className="option" onClick={this.handleClick} key={year.modelyear} value={year.modelyear}> {year.modelyear} </option>
                ))}
            </div>
        )
    }
}

export default connect(state => state, { getYears, getMakes, addYear, addIndex })(Year)