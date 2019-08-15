import React from 'react';

function CarForm (props) {
    return (
        <div className="car-form-wrapper">
            <form className="car-form" onSubmit={props.handleSubmit}>
                <div className="car-row">
                    <div className="car-column">
                        <label htmlFor="year"> Year: </label>
                        <select 
                            className="car-dropdown" 
                            name="year" 
                            value={props.year} 
                            onChange={props.handleChange}
                        >
                            <option value="select"> Select Year </option>
                            <option value="2019"> 2019 </option>
                            <option value="2018"> 2018 </option>
                            <option value="2017"> 2017 </option>
                            <option value="2016"> 2016 </option>
                            <option value="2015"> 2015 </option>
                            <option value="2014"> 2014 </option>
                            <option value="2013"> 2013 </option>
                            <option value="2012"> 2012 </option>
                            <option value="2011"> 2011 </option>
                            <option value="2010"> 2010 </option>
                        </select>
                    </div>
                    <div className="car-column">
                        <label htmlFor="make"> Make: </label>
                        <select 
                            className="car-dropdown" 
                            name="make" 
                            value={props.make} 
                            onChange={props.handleChange}
                        >
                            <option value="select"> Select Make </option>
                            <option value="subaru"> Subaru </option>
                            <option value="toyota"> Toyota </option>
                            <option value="honda"> Honda </option>
                        </select>
                    </div>
                </div>
                <div className="car-row">
                    <div className="car-column">
                        <label htmlFor="model"> Model: </label>
                        <select 
                            name="model"
                            className="car-dropdown"
                            value={props.model}
                            onChange={props.handleChange} 
                        >
                            <option value="select"> Select Model </option>
                            <option value="outback"> Outback </option>
                            <option value="tacoma"> Tacoma </option>
                            <option value="honda"> Accord </option>
                        </select>
                    </div>
                    <div className="car-column">
                        <label htmlFor="Trim"> Trim: </label>
                        <select 
                            className="car-dropdown"
                            name="trim" 
                            value={props.trim}
                            onChange={props.handleChange}
                        >
                            <option value="select"> Select Trim </option>
                            <option value="base"> Base </option>
                            <option value="luxury"> Luxury </option>
                            <option value="sport"> Sport </option>
                        </select>
                    </div>
                </div>
                <div className="car-row">
                    <label htmlFor="condition"> Condition: </label>
                    <select 
                        placeholder="Select Condition"
                        name="condition"
                        className="car-dropdown"
                        value={props.condition}
                        onChange={props.handleChange}
                    >
                        <option value="select"> Select Condition </option>
                        <option value="excellent"> Excellent </option>
                        <option value="very good"> Very Good </option>
                        <option value="good"> Good </option>
                        <option value="fair"> Fair </option>
                    </select>
                </div>
                <div className="car-row">
                    <div className="car-column">
                        <label htmlFor="miles" className="car-label"> Miles </label>
                        <input 
                            type="text"
                            onChange={props.handleChange}
                            value={props.miles}
                            name="miles"
                            placeholder="Must be a number"
                            className="car-input" />
                    </div>
                    <div className="car-column">
                        <label htmlFor="zip" className="car-label"> Zip </label>
                        <input 
                            type="text"
                            onChange={props.handleChange}
                            value={props.zip}
                            name="zip"
                            placeholder="Must be 5 digit number"
                            className="can-input"
                            maxLength="5" />
                    </div>
                </div>
                <button> Submit </button>
            </form>
        </div>
    )
}

export default CarForm;