import React from 'react';
import { connect } from 'react-redux';
import { addMiles, addIndex } from '../redux/Form';

class Miles extends React.Component {
    constructor() {
        super()
        this.state = {
            miles: ''
        }
    }
    componentDidMount() {
        if(this.state.miles.length === 0 && this.props.form.miles.length > 0) {
            this.setState({
                miles: this.props.form.miles
            })
        }
    }
    componentDidUpdate() {
        if(this.props.form.miles.length === 6 && this.props.form.miles !== this.state.miles) {
            setTimeout(
                function() {
                    var index = (this.props.form.index + 1);
                    this.props.addIndex(index);
                }.bind(this), 1000
            )
        }
    }
    componentWillUnmount() {
        clearTimeout();
    }
    handleChange = (e) => {
        var number = e.target.value.replace(/\D/,'')
        this.props.addMiles(number)
    }

    render() {
        return (
            <div className="input-container">
                <input 
                    type="text" 
                    placeholder="Must be a number"
                    value={this.props.form.miles} 
                    onChange={this.handleChange}
                    name="miles" 
                    className="offer-input" 
                    />
            </div>
        )
    }
}

export default connect(state => state, { addMiles, addIndex })(Miles);