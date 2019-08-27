import React from 'react';
import { connect } from 'react-redux';
import PersonalForm from './PersonalForm'

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
            series: '',
            style: '',
            uvc: '',
            vin: '',
            failed: false,
            isClicked: false
        }
    }
    componentDidMount() {
        if(this.props.usedVin) {
            this.props.blackVin.used_vehicles.used_vehicle_list.map(list => {
                this.setState({
                    avgPrice: list.adjusted_tradein_avg,
                    cleanPrice: list.adjusted_tradein_clean,
                    roughPrice: list.adjusted_tradein_rough,
                    make: list.make,
                    year: list.model_year,
                    model: list.model,
                    series: list.series,
                    style: list.style,
                    uvc: list.uvc,
                    vin: list.vin
                })
            })
        } else {
            this.props.blackValue.used_vehicles.used_vehicle_list.map(list => {
                this.setState({
                    avgPrice: list.adjusted_tradein_avg,
                    cleanPrice: list.adjusted_tradein_clean,
                    roughPrice: list.adjusted_tradein_rough,
                    make: list.make,
                    year: list.model_year,
                    model: list.model,
                    series: list.series,
                    style: list.style,
                    uvc: list.uvc,
                    vin: list.vin
                })
            })
        }
    }
    componentDidUpdate() {
        if((this.state.cleanPrice > 0 && this.state.roughPrice > 0 && this.state.avgPrice > 0) && (this.state.lowPrice === 0)) {
            this.getPrices()
        }
    }
    getPrices = () => {
        if(this.props.condition === 'average') {
            var low = (this.state.avgPrice * .70)
            var high = (this.state.avgPrice * .90)
            this.setState({
                lowPrice: low,
                highPrice: high
            })
        } else if(this.props.condition === 'clean') {
            let low = (this.state.cleanPrice * .70)
            let high = (this.state.cleanPrice * .90)
            console.log("LOW:", low)
            console.log("HIGH: ", high)
            this.setState({
                lowPrice: low,
                highPrice: high
            })
        } else {
            let low = (this.state.roughPrice * .70)
            let high = (this.state.roughPrice * .90)
            this.setState({
                lowPrice: low,
                highPrice: high
            })
        }
    }
    handleClick = () => {
        this.setState({
            isClicked: true
        })
    }
    render() {
        console.log(this.state)
        return (
            <div>
                {this.state.isClicked 
                ? <PersonalForm files={this.props.files} miles={this.props.miles} condition={this.props.condition} zip={this.props.zip} uvc={this.state.uvc} year={this.state.year} make={this.state.make} model={this.state.model} series={this.state.series} style={this.state.style} vin={this.state.vin} lowPrice={this.state.lowPrice} highPrice={this.state.highPrice}  />
                : 
                <div className="pricing-page">
                    <div className="price-container">
                        <h2 className="price-vehicle"> {this.props.year} {this.props.make} {this.props.model} </h2>
                        <h2 className="price-range"> ${this.state.lowPrice} - ${this.state.highPrice} </h2>
                        <p className="price-text"> If you decide to continue we will send you a final offer within 24 hours. The price can go up or down from the range. If you accept the offer we will come to you and pick up the vehicle and you'll get paid!  </p>
                        <button className="price-button" onClick={this.handleClick}> Continue <i id="price-arrow" className="fas fa-arrow-circle-right"></i> </button>
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default connect(state => state)(Price)