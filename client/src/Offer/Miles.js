import React from 'react';
import { connect } from 'react-redux';
import { addMiles } from '../redux/Form';

class Miles extends React.Component {
    handleChange = (e) => {
        this.props.addMiles(e.target.value)
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

export default connect(state => state, { addMiles })(Miles);