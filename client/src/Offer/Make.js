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
    handleClick = (make) => {
        this.props.addMake(make);
        var index = this.props.form.index + 1;
        this.props.addIndex(index)
    }
    mapMakes = () => {
        return ( this.props.blackValue.drilldown.class_list.map(list => list.year_list.map(year => year.make_list.map(make => (
            <a href="#" className="option" name={make.name} key={make.name} onClick={() => this.handleClick(make.name)}>{make.name} </a> 
        ))))
        )
    }
    render() {
        return (
            <div className="option-container">
                {this.state.loaded 
                ? this.mapMakes()
                : <h2> Getting Makes </h2>   }
            </div>
        )
    }
}

export default connect(state => state, { addMake, getMakes, addIndex })(Make);