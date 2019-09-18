import React from 'react';
import { connect } from 'react-redux';
import { addMake, addIndex } from '../redux/Form';
import { getMakes } from '../redux/BlackValue';

class Make extends React.Component {
    constructor() {
        super()
        this.state = {
            loaded: false,
            clicked: true,
            make: ''
        }
    }
    componentDidMount() {
        this.props.getMakes(this.props.form.year)
        if(this.props.form.make.length > 0 && this.state.make.length === 0) {
            this.setState({
                make: this.props.form.make
            })
        }
    }
    componentDidUpdate() {
        if(this.props.blackValue.drilldown.class_list.length > 0 && !this.state.loaded) {
            this.setState({ loaded: true })
        }
    }
    componentWillUnmount() {
        clearTimeout();
    }
    handleClick = (make) => {
        this.setState({
            make: make
        })
        setTimeout(
            function() {
                this.props.addMake(make);
                var index = this.props.form.index + 1;
                this.props.addIndex(index)
            }.bind(this), 500
        )
    }
    mapMakes = () => {
        return ( this.props.blackValue.drilldown.class_list.map(list => list.year_list.map(year => year.make_list.map(make => (
            <button className="option" name={make.name} key={make.name} onClick={() => this.handleClick(make.name)}> {make.name} <span className={(this.state.make === make.name) ? "option-selected" : "not-selected"}>&#10003;</span> </button> 
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