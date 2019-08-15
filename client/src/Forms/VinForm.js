import React from 'react';
import '../assets/scss/vinForm.scss';

function VinForm(props) {
    return (
        <div className="vin-form-wrapper">
            <form className="vin-form" onSubmit={props.handleSubmit}>
                <div className="vin-row">
                    <div className="vin-full-column">
                        <label htmlFor="vin" className="vin-label"> VIN </label>
                        <input 
                            onChange={props.handleChange} 
                            value={props.vin}
                            name="vin" 
                            type="text" 
                            placeholder="17 Digit VIN Number" 
                            className="vin-input"
                            maxLength="17" />
                    </div>
                </div>
                <div className="vin-row">
                    <div className="vin-column">
                        <label htmlFor="miles" className="vin-label"> Miles </label>
                        <input 
                            onChange={props.handleChange}
                            value={props.miles}
                            name="miles"
                            type="text"
                            placeholder="Must be a number" 
                            className="vin-input"/>
                    </div>
                    <div className="vin-column">
                        <label htmlFor="zip" className="vin-label"> Zip Code </label>
                        <input 
                            onChange={props.handleChange}
                            value={props.zip}
                            name="zip"
                            type="text" 
                            placeholder="Must be a 5 digit number"
                            className="vin-input"
                            maxLength="5" />
                    </div>
                </div>
                <button className="vin-button"> Submit </button>
            </form>
        </div>
    )
}
export default VinForm;