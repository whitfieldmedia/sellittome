import React from 'react';
import { connect } from 'react-redux';
import { addMake, addIndex, showError } from '../redux/Form';
import { getMakes } from '../redux/BlackValue';

class Make extends React.Component {
    constructor() {
        super()
        this.state = {
            clicked: true,
            isLoaded: false
        }
    }
    componentDidMount() {
        this.props.getMakes(this.props.form.year) 
    }
    componentDidUpdate() {
        try {
            if(this.props.blackValue.drilldown.class_list.map(list => list.year_list.map(year => year.make_list.map(make => make.name))) && !this.state.isLoaded ) {
                this.setState({
                    isLoaded: true
                })
            }
        } catch(err) {
            throw err;
        }
    }
    componentWillUnmount() {
        clearTimeout();
    }
    handleClick = (make) => {
        this.props.addMake(make)
        setTimeout(
            function() {
                var index = this.props.form.index + 1;
                this.props.showError(false)
                this.props.addIndex(index)
            }.bind(this), 500
        )
    }
    mapMakes = () => {
        return ( this.props.blackValue.drilldown.class_list.map(list => list.year_list.map(year => year.make_list.map(make => (
            <button className="option" name={make.name} key={make.name} value={make.name} onClick={() => this.handleClick(make.name)}>        
                {make.name} 
                <span className={(this.props.form.make === make.name) ? "option-selected" : "not-selected"}>&#10003;</span>
            </button> 
        ))))
        )
    }
    render() {
        return (
            <div className="option-container">
                {this.state.isLoaded 
                ? this.mapMakes()
                : null}
            </div>
        )
    }
}

export default connect(state => state, { addMake, getMakes, addIndex, showError })(Make);