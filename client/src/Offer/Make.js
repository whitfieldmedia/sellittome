import React from 'react';
import { connect } from 'react-redux';
import { addMake, addIndex } from '../redux/Form';
import { getMakes } from '../redux/BlackValue';

class Make extends React.Component {
    constructor() {
        super()
        this.state = {
            loaded: false
        }
    }
    componentDidMount() {
        this.props.getMakes(this.props.form.year)
    }
    componentDidUpdate() {
        if(this.props.blackValue.drilldown.class_list.length > 0 && !this.state.loaded) {
            this.setState({ loaded: true })
        }
    }
    handleClick = e => {
        e.preventDefault();
        this.props.addMake(e.target.value);
        var index = this.props.form.index + 1;
        this.props.addIndex(index)
    }
    mapMakes = () => {
        if(this.state.loaded) {
            return (
                this.props.blackValue.drilldown.class_list.map(list => list.year_list.map(year => year.make_list.map(make => (
                    <option className="option" onClick={this.handleClick} key={make.name} value={make.name} name="make"> {make.name} </option> 
                ))))
            )
        }
    }
    render() {
        console.log(this.props)
        return (
            <div className="option-container">
                {this.mapMakes()}
            </div>
        )
    }
}

export default connect(state => state, { addMake, getMakes, addIndex })(Make);