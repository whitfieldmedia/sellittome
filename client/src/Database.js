import React from 'react';
import { connect } from 'react-redux';
import { getVehicles } from './redux/vehicleDatabase';
import './assets/css/database.css';

class Database extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            filter: ''
        }
    }
    componentDidMount() {
        this.props.getVehicles();
    }
    handleClick = (id) => {
        if(this.state.id === id) {
            return this.setState({
                id: ''
            })
        }
        return this.setState({
            id: id
        })
    }
    showVehicles = () => {
        return this.props.vehicleDatabase.filter(vehicle => { 
            if(this.state.filter.length > 0) {
                var car = (vehicle.year + " " + vehicle.make + " " + vehicle.model + " " + vehicle.style + " " + vehicle.miles + " " + vehicle.name + " " + vehicle.from + " " + vehicle.phone + " " + vehicle.zip) 
                return car.toLowerCase().includes(this.state.filter.toLowerCase()) 
            } 
            return vehicle
            }).map(vehicle => (
            <div key={vehicle._id} className="database-container" onClick={() => this.handleClick(vehicle._id)}>
                <div className="database-header-container">
                    <h2> {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.style} </h2>
                    <i className="fas fa-caret-down fa-lg"></i>
                </div>
                {this.state.id === vehicle._id
                ?
                <table className="database-information-container">
                    <tr className="database-row">
                        <td> Year: </td>
                        <td> {vehicle.year} </td>
                    </tr>
                    <tr className="database-row">
                        <td> Make: </td>
                        <td> {vehicle.make} </td>
                    </tr>
                    <tr className="database-row">
                        <td> Model: </td>
                        <td> {vehicle.model} </td>
                    </tr>
                    <tr className="database-row">
                        <td> Trim: </td>
                        <td> {vehicle.style} </td>
                    </tr>
                    <tr className="database-row">
                        <td> UVC: </td>
                        <td> {vehicle.uvc} </td>
                    </tr>
                    <tr className="database-row">
                        <td> VIN: </td>
                        <td> {vehicle.vin} </td>
                    </tr>
                    <tr className="database-row">
                        <td> MILES: </td>
                        <td> {vehicle.miles} </td>
                    </tr>
                    {vehicle.files.length > 0 
                    ? 
                    <tr className="database-row">
                        <td> Images: </td> 
                        <td> {vehicle.files.map(file => (
                            <a href={file} target="_blank" rel="noopener noreferrer" key={file}>
                                <img src={file} className="database-images" alt={vehicle.make}/> <br/>
                            </a>

                            ))} 
                        </td>
                    </tr>
                    : null}
                    <tr className="database-row">
                        <td> Name: </td>
                        <td> {vehicle.name} </td>
                    </tr>
                    <tr className="database-row">
                        <td> Email: </td>
                        <td> {vehicle.from} </td>
                    </tr>
                    <tr className="database-row">
                        <td> Phone: </td>
                        <td> {vehicle.phone} </td>
                    </tr>
                    <tr className="database-row">
                        <td> ZIP: </td>
                        <td> {vehicle.zip} </td>
                    </tr>
                </table>
                : null}
            </div>
        ))
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    filter = () => {

    }
    render() {
        return (
            <div className="database-wrapper">
                <input className="database-search-input" type="text" onChange={this.handleChange} value={this.state.filter} name="filter" placeholder="Search Inventory" />
               <div className="database-page">
                    {this.showVehicles()}
                </div>
            </div>

        )
    }
}

export default connect(state => state, { getVehicles })(Database)