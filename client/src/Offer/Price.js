import React from 'react';
import { connect } from 'react-redux';
import { sendEmail } from '../redux/email';
import { getValue, getVin } from '../redux/BlackValue';
import { emailSent, addYear, addMake, addModel, addStyle, addLowPrice, addHighPrice, addUvc, addBasePrice } from '../redux/Form';
import '../assets/css/price.css';

class Price extends React.Component {
    constructor() {
        super()
        this.state = {
            usedVin: false,
            finishedLoading: false,
            noOffer: false,
            basePrice: false,
            gettingPrice: false
        }
    }
    async componentDidMount() {
        if(this.props.form.vin.length === 17) {
           await this.props.getVin(this.props.form.vin, this.props.form.miles)
        } else {
            await this.props.getValue(this.props.form.uvc, this.props.form.miles)
        }
    }
    componentDidUpdate() {
        try {
            if(this.props.blackValue.used_vehicles.used_vehicle_list.map(res => res) && !this.state.gettingPrice) {
                this.getPrice();
                this.setState({
                    gettingPrice: true
                })
            }
        } catch(error) {
            this.forceUpdate();
            console.dir(error)
        }
    }

    getPrice = () => {
        var props = this.props;
        var condition = props.form.condition;
        return props.blackValue.used_vehicles.used_vehicle_list.map(res => {
            if(this.props.form.vin.length > 0) {
                props.addYear(res.model_year);
                props.addMake(res.make);
                props.addModel(res.model);
                props.addStyle(res.style);
                props.addUvc(res.uvc);
            }
            var price = 0;
            if(condition === 'clean') {
                price = parseInt(res.adjusted_tradein_clean, 10)
            } else if (condition === 'average') {
                price = parseInt(res.adjusted_tradein_avg, 10)
            } else {
                price = parseInt(res.adjusted_tradein_rough, 10)
            }
            if(this.props.form.basePrice !== price) {
                props.addBasePrice(price);
            }
            if(!this.state.basePrice) {
                this.setState({ basePrice: true })
            }
            return this.getRange(price);
        })
    }
    getRange = (price) => {
        var low;
        var high;
        if(low < 1500) {
            if(!this.state.noOffer) {
                this.setState({
                    noOffer: true
                })
            }
            low = 0;
            high = 0;
            this.props.addHighPrice(0);
            this.props.addLowPrice(0);
            return this.sendEmail(low, high)
        } else {
            low = price * 0.7;
            high = price * 0.9;
            this.props.addHighPrice(parseInt(high, 10));
            this.props.addLowPrice(parseInt(low, 10));
            return this.sendEmail(low, high);
        }
    }

    sendEmail = (low, high) => {
        let form = this.props.form
        if(!this.props.form.sent) {
            if(low < 1000) {
                var message = {
                    lowPrice: 250,
                    highPrice: 750,
                    name: form.name,
                    from: form.email,
                    phone: form.phone,
                    year: form.year,
                    make: form.make,
                    model: form.model,
                    style: form.style,
                    uvc: form.uvc,
                    vin: form.vin,
                    zip: form.zip,
                    condition: form.condition,
                    files: form.files,
                    miles: form.miles
                }
                this.props.sendEmail(message);
                return this.setState({
                    finishedLoading: true
                })
            } else {
                var message2 = {
                    lowPrice: low - 800,
                    highPrice: high - 800,
                    name: form.name,
                    from: form.email,
                    phone: form.phone,
                    year: form.year,
                    make: form.make,
                    model: form.model,
                    style: form.style,
                    uvc: form.uvc,
                    vin: form.vin,
                    zip: form.zip,
                    condition: form.condition,
                    files: form.files,
                    miles: form.miles
                }
                this.props.sendEmail(message2);
                this.props.emailSent(true);
                return this.setState({
                    finishedLoading: true
                })
            }
        } else {
            if(!this.state.finishedLoading) {
                return this.setState({ finishedLoading: true })
            }
        }
    }
    render() {
        return (
            this.state.finishedLoading 
            ?
            <div className="pricing-page">
                <div className="price-container">
                    {this.state.noOffer ? 
                        <h2 className="price-range"> 
                            Unable to provide an instant offer. We will send an offer within 24hrs 
                        </h2> 
                    : 
                        <h2 className="price-range">
                            Your instant offer has been sent to your email.
                        </h2>
                    }
                    <h2 className="price-vehicle"> 
                        {this.props.form.year} {this.props.form.make} {this.props.form.model} {this.props.form.style} 
                    </h2>
                    <p className="price-text"> 
                        Thank you for using Sell It To Me. Your instant offer has been sent to your email. We will send you an official offer within 24hrs.
                    </p>
                </div>
            </div>
            : 
            <div className="pricing-page">
                <div className="price-container">
                    <h2 className="price-vehicle"> Getting your vehicles value. </h2>
                    <p className="price-text"> 
                        Thank you for using Sell It To Me. Your instant offer has been sent to your email. We will send you an official offer within 24hrs. In the email we will explain further steps to get cash for your vehicle.
                    </p>
                </div>
            </div>
        )
    }
}

export default connect(state => state, { sendEmail, emailSent, getValue, getVin, addYear, addMake, addModel, addStyle, addLowPrice, addHighPrice, addUvc, addBasePrice })(Price)