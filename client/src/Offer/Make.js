import React from 'react';
import { connect } from 'react-redux';
import { addMake } from '../redux/Form';
import { getBlackModels } from '../redux/BlackModels';

class Make extends React.Component {
    componentDidUpdate() {
        if(this.props.form.make.length > 0) {
            this.props.getBlackModels(this.props.form.year, this.props.form.make)
            this.props.handleNext()
        }
    }
    handleClick = e => {
        e.preventDefault();
        this.props.addMake(e.target.value);
    }
    mapMakes = () => {
        if(this.props.blackCar.drilldown.class_list.length > 0) {
            return (
                this.props.blackCar.drilldown.class_list.map(list => list.year_list.map(year => year.make_list.map(make => (
                    <option className="option" onClick={this.handleClick} key={make.name} value={make.name} name="make"> {make.name} </option> 
                ))))
            )
        }
    }
    render() {
        return (
            <div className="option-container">
                {this.mapMakes()}
            </div>
        )
    }
}

export default connect(state => state, { addMake, getBlackModels })(Make);