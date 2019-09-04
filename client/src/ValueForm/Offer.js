import React from 'react';
import { connect } from 'react-redux';
import { sendEmail } from '../redux/email';
import { emailSent } from '../redux/Form';
import '../assets/scss/price.scss';

class Offer extends React.Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            lowOffer: 0,
            highOffer: 0,
            year: '',
            make: '',
            model: '',
            style: '',
            vehicleId: '',
            vin: '',
            usedVin: false,
            finishedLoading: false
        }
    }
    componentDidMount() {
        if(this.props.form.vin.length === 17 && !this.state.usedVin) {
            this.setState({ usedVin: true })
        }
    }
    componentDidUpdate() {
        if(parseInt(this.props.years.result.map(res => res.adjustedcleantrade)) > 0) {
            this.getPrice()
        }
        if(this.state.value !== 0) {
            this.getRange()
        }
        if(this.state.lowOffer > 0 && this.state.highOffer > 0) {
            this.sendEmail();
            if(!this.state.finishedLoading) {
                this.setState({ finishedLoading: true })
            }
        }
    }
    getPrice = () => {
        var condition = this.props.form.condition;
        if(this.state.value === 0) {
            if(this.state.usedVin) {
                this.props.years.result[0].map(res => {
                    var year = res.modelyear;
                    var make = res.make;
                    var model = res.model;
                    var body = res.body;
                    var vehicleId = res.ucgvehicleid;
                    var price = 0;
                    if(condition === 'clean') {
                        price = parseInt(res.adjustedcleantrade, 10)
                    } else if (condition === 'average') {
                        price = parseInt(res.adjustedaveragetrade, 10)
                    } else {
                        price = parseInt(res.adjustedroughtrade, 10)
                    }
                    this.setState({ year: year, make: make, model: model,
                        style: body, vehicleId: vehicleId, value: price })
                })
            } else {
                this.props.years.result.map(res => {
                    var price = 0;
                    if(condition === 'clean') {
                        price = parseInt(res.adjustedcleantrade, 10)
                    } else if (condition === 'average') {
                        price = parseInt(res.adjustedaveragetrade, 10)
                    } else {
                        price = parseInt(res.adjustedroughtrade, 10)
                    }
                    var form = this.props.form
                    this.setState({ year: form.year, model: form.model, make: form.make,
                        style: form.style, vehicleId: form.vehicleId, value: price })
                })
            }
        }
        this.getRange()
    }

    getRange = () => {
        if( this.state.lowOffer === 0 || this.state.highOffer === 0 && this.state.value > 0) {
            let fileLength = this.props.form.files.length;
            var low = 0;
            var high = 0;
            var price = this.state.value
            if(fileLength > 0) {
                low = (price * .8)
                high = (price * .9)
            } else {
                low = (price * .7)
                high = (price * .8)
            }
            this.setState({ lowOffer: low, highOffer: high })
        }
    }

    sendEmail = () => {
        var form = this.props.form;
        var state = this.state
        if(!form.sent) {
            var message = {
                lowPrice: state.lowOffer,
                highPrice: state.highOffer,
                name: form.name,
                from: form.email,
                phone: form.phone,
                year: state.year,
                make: state.make,
                model: state.model,
                style: state.style,
                vehicleId: state.vehicleId,
                vin: state.vin,
                zip: form.zip,
                condition: form.condition,
                files: form.files,
                miles: form.miles
            }
            this.props.sendEmail(message);
            this.props.emailSent(true)
        }   
    }
    render() {
        console.log("OFFER STATE: ", this.state)
        console.log("OFFER PROPS: ", this.props)
        return (
            <div>
                {this.state.finishedLoading 
                ?
                <div className="pricing-page">
                    <div className="price-container">
                        <h2 className="price-vehicle"> {this.state.year} {this.state.make} {this.state.model} {this.state.style} </h2>
                        <h2 className="price-range"> ${parseInt(this.state.lowOffer - 800)} - ${parseInt(this.state.highOffer - 800)} </h2>
                        <p className="price-text"> If you decide to continue we will send you a final offer within 24 hours. The price can go up or down from the range. If you accept the offer we will come to you and pick up the vehicle and you'll get paid!  </p>
                    </div>
                </div>
                : <h1> Getting Vehicles Values </h1> }
            </div>
        )
    }
}

export default connect(state => state, { sendEmail, emailSent })(Offer);