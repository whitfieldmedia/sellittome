import React from 'react';
import { connect } from 'react-redux';
import { addStyle, addVehicleId, addIndex, showError } from '../redux/Form';
import { getBodies } from '../redux/Year';

class Bodies extends React.Component {
    componentDidMount() {
        this.props.getBodies(this.props.form.year, this.props.form.make, this.props.form.model)
    }
    handleClick = (id, body) => {
        if(id.length > 0 && body.length > 0) {
            this.props.addVehicleId(id)
            this.props.addStyle(body)
            var index = this.props.form.index + 1;
            this.props.addIndex(index);
        } else {
            this.props.showError()
        }
    }
    mapBodies = () => {
        if(this.props.years.result.length > 0) {
            return (
                    this.props.years.result.map((body, index) => (
                    <option className="option" name={body.body} key={index} value={body.ucgvehicleid} onClick={() => this.handleClick(body.ucgvehicleid,   body.body)}> {body.body} </option>
                ))
            )
        }
    }
    render() {
        return (
            <div className="option-container">
                {this.mapBodies()}
            </div>
        )
    }
}

export default connect(state => state, { addStyle, addVehicleId, addIndex, getBodies, showError })(Bodies)