import React from 'react';
import { connect } from 'react-redux';
import { addStyle, addVehicleId, addIndex } from '../redux/Form';

class Bodies extends React.Component {
    handleClick = (id, body) => {
        this.props.addVehicleId(id)
        this.props.addStyle(body)
        var index = this.props.form.index + 1;
        this.props.addIndex(index);
    }
    render() {
        return (
            <div className="option-container">
                {this.props.years.result.map(body => (
                    <option className="option" name={body.body} key={body.ucgvehicleid} value={body.ucgvehicleid} onClick={() => this.handleClick(body.ucgvehicleid, body.body)}> {body.body} </option>
                ))}
            </div>
        )
    }
}

export default connect(state => state, { addStyle, addVehicleId, addIndex, })(Bodies)