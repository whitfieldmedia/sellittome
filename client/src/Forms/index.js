import React from 'react';
import VinForm from './VinForm';
import CarForm from './CarForm';
import '../assets/scss/forms.scss';

class Forms extends React.Component {
    constructor() {
        super();
        this.state = {
            vinInputs: {
                vin: '',
                miles: '',
                zip: ''
            },
            carInputs: {
                year: '',
                make: '',
                model: '',
                trim: '',
                condition: '',
                zip: '',
                miles: ''
            },
            isCarSelected: false
        }
    }
    handleChange = (e) => {
        e.persist();
        const { name, value } = e.target
        this.setState(prevState => {
            return {
                vinInputs: {
                    ...prevState.vinInputs,
                    [name]: value
                },
                ...prevState.carInputs
            }
        })
    }
    handleCarChange = (e) => {
        e.persist();
        const { name, value } = e.target;
        this.setState(prevState => {
            return {
                ...prevState.vinInputs,
                carInputs: {
                    ...prevState.carInputs,
                    [name]: value
                }
            }
        })
    }
    clearInputs = () => {
        this.setState({
            vinInputs: {
                vin: '',
                miles: '',
                zip: '',
                condition: ''
            },
            carInputs: {
                year: '',
                make: '',
                model: '',
                trim: '',
                condition: '',
                zip: '',
                miles: ''
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.vinInputs)
        this.clearInputs();
    }
    handleCarClick = () => {
        if(!this.state.isCarSelected) {
            this.setState({ isCarSelected: true })
        }
    }
    handleVinClick = () => {
        if(this.state.isCarSelected) {
            this.setState({ isCarSelected: false })
        }
    }
    render() {
        console.log(this.state.vinInputs)
        console.log(this.state.carInputs)
        return (
            <div>
                <div className="select-row">
                    <button className={!this.state.isCarSelected ? 'select-button active' : 'select-button'} onClick={this.handleVinClick}> Enter VIN </button>
                    <button className={this.state.isCarSelected ? 'select-button active' : 'select-button'} onClick={this.handleCarClick}> Enter Car Info </button>
                </div>
                {this.state.isCarSelected
                ? 
                    <CarForm 
                        handleChange={this.handleCarChange} 
                        handleSubmit={this.handleSubmit} 
                        {...this.state.carInputs}
                    />
                : 
                    <VinForm 
                        handleChange={this.handleChange} 
                        handleSubmit={this.handleSubmit} 
                        {...this.state.vinInputs}
                    />
                }
            </div>
        )
    }
}

export default Forms;