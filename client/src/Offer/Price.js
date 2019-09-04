import React from 'react';
import { connect } from 'react-redux';
import { sendEmail } from '../redux/email';
import { getBlackValue, getBlackVin } from '../redux/BlackValue';
import { emailSent } from '../redux/Form';
import '../assets/scss/price.scss';

class Price extends React.Component {
    constructor() {
        super()
        this.state = {
            avgPrice: 0,
            cleanPrice: 0,
            roughPrice: 0,
            lowPrice: 0,
            highPrice: 0,
            year: '',
            make: '',
            model: '',
            style: '',
            uvc: '',
            vin: '',
            failed: false,
            isClicked: false,
            isSent: false,
            usedVin: false,
            success: false
        }
    }
    componentDidUpdate() {
        if(this.props.blackValue.used_vehicles.data_available === true) {
            this.mapVehicle();
        }
    }
    mapVehicle = () => {
        this.props.blackValue.used_vehicles.used_vehicle_list.map(list => {
            this.setState({
                avgPrice: list.adjusted_tradein_avg,
                cleanPrice: list.adjusted_tradein_clean,
                roughPrice: list.adjusted_tradein_rough,
                make: list.make,
                year: list.model_year,
                model: list.model,
                style: list.style,
                uvc: list.uvc,
                vin: list.vin,
                success: true
            })
        })
        this.getPrice()
    }
    getPrice = () => {
        var avgPrice = this.state.avgPrice;
        var cleanPrice = this.state.cleanPrice;
        var roughPrice = this.state.roughPrice;
        var condition = this.props.form.condition;
        let filesLength = this.props.form.files.length;
        var low = 0;
        var high = 0;
        if(condition === "average") {
            if(filesLength === 0) {
                low = (avgPrice * .70)
                high = (avgPrice * .80)
            } else {
                low = (avgPrice * .80)
                high = (avgPrice * .90)
            }
            this.setState({ highPrice: high, lowPrice: low })
        } else if (condition === 'clean') {
            if(filesLength === 0) {
                low = (cleanPrice * .70)
                high = (cleanPrice * .80)
            } else {
                low = (cleanPrice * .70)
                high = (cleanPrice * .80)
            }
            this.setState({ highPrice: high, lowPrice: low })
        } else {
            if(filesLength === 0) {
                low = (roughPrice * .80)
                high = (roughPrice * .90)
            } else {
                low = (roughPrice * .70)
                high = (roughPrice * .80)
            }
            this.setState({ highPrice: high, lowPrice: low })
        }
        this.sendEmail()
    }
    sendEmail = () => {
        let form = this.props.form
        let state = this.state
        if(!form.sent) {
            var message = {
                lowPrice: state.lowPrice,
                highPrice: state.highPrice,
                name: form.name,
                from: form.email,
                phone: form.phone,
                year: state.year,
                make: state.make,
                model: state.model,
                style: state.style,
                uvc: state.uvc,
                vin: state.vin,
                zip: form.zip,
                condition: form.condition,
                files: form.files,
                miles: form.miles
            }
            this.props.sendEmail(message);
            this.props.emailSent(true);
        } 
    }
    render() {
        return (
            <div>      
                <div className="pricing-page">
                    <div className="price-container">
                        <h2 className="price-vehicle"> {this.state.year} {this.state.make} {this.state.model} </h2>
                        <h2 className="price-range"> ${this.state.lowPrice} - ${this.state.highPrice} </h2>
                        <p className="price-text"> If you decide to continue we will send you a final offer within 24 hours. The price can go up or down from the range. If you accept the offer we will come to you and pick up the vehicle and you'll get paid!  </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state, { sendEmail, emailSent, getBlackValue, getBlackVin })(Price)