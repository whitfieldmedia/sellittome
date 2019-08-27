import React from 'react';
import { connect } from 'react-redux';
import { getBlackVin } from '../redux/BlackVin';
import { getBlackMakes } from '../redux/BlackCar';
import { getBlackModels } from '../redux/BlackModels';
import { getBlackTrims } from '../redux/BlackTrims';
import { getBlackValue } from '../redux/BlackValue';
import Price from './Price';
import '../assets/scss/offer.scss'

class Offer extends React.Component {
    constructor() {
        super();
        this.state = {
            vin: '',
            year: '',
            make: '',
            model: '',
            uvc: '',
            miles: '',
            condition: '',
            zip: '',
            files: [],
            index: 1,
            offerDone: false,
            usedVin: false,
            vinError: false,
            yearError: false,
            makeError: false,
            modelError: false,
            trimError: false,
            mileError: false,
            conditionError: false,
            zipError: false,
            fileError: false
        }
    }
    handlePrev = e => {
        e.persist()
        this.setState({
            index: this.state.index - 1
        })
    }
    handleVinSubmit = () => {
        var vin = this.state.vin;
        var length = vin.length;
        if(length === 17) {
            this.props.getBlackVin(this.state.vin);
            this.setState({
                offerDone: true,
                usedVin: true
            })
        } else {
            this.setState({
                vinError: true,
                offerDone: false
            })
        }
    }
    handleNext = (target) => {
        if(this.state.index === 1) {
            var year = this.state.year
            if(year.length === 4) {
                this.props.getBlackMakes(this.state.year);
                this.next({ index: this.state.index + 1 })
            } else {
                this.setState({ yearError: true, index: this.state.index })
            }
        } else if(this.state.index === 2) {
            if(target.length > 0) {
                this.props.getBlackModels(this.state.year, target);
                this.next()
            } else if(this.state.make.length > 0) {
                this.props.getBlackModels(this.state.year, this.state.make)
                this.next()
            }
            else {
                this.setState({ makeError: true, index: this.state.index })
            }
        } else if(this.state.index === 3) {
            if(target.length > 0) {
                this.props.getBlackTrims(this.state.year, this.state.make, target);
                this.next()
            } else if(this.state.model.length > 0) {
                this.props.getBlackTrims(this.state.year, this.state.make, this.state.model)
                this.next()
            } else {
                this.setState({ modelError: true, index: this.state.index })
            }
        } else if(this.state.index === 4) {
            if(target.length > 0) {
                this.next();
            } else if(this.state.uvc.length > 0) {
                this.next();
            } else {
                this.setState({ trimError: true, index: this.state.index })
            }
        }
        else if(this.state.index === 5) {
            if(this.state.miles.length > 0) {
                this.props.getBlackValue(this.state.uvc, this.state.miles)
                this.next();
            } else {
                this.setState({ mileError: true, index: this.state.index })
            }
        } else if(this.state.index === 6) {
            if(this.state.condition.length > 0) {
                this.next();
            } else {
                this.setState({ conditionError: true })
            }
        } else if(this.state.index === 7) {
            if(this.state.zip.length === 5) {
                this.next();
            } else {
                this.setState({ zipError: true })
            }
        } else if(this.state.index === 8) {
            if(this.state.files.length > 0 || this.state.fileError) {
                this.setState({ offerDone: true })
            } else {
                this.setState({ fileError: true })
            }
        } 
    }
    next = () => {
        this.setState({
            index: this.state.index + 1
        })
    }
    handleOptionClick = e => {
        e.preventDefault();
        console.log('value: ' + e.target.value)
        this.setState({
            make: e.target.value
        })
        return this.handleNext(e.target.value)
    }
    handleModelClick = e => {
        e.persist();
        this.setState({
            model: e.target.value,
        })
        return this.handleNext(e.target.value)
    }
    handleTrimClick = e => {
        e.persist()
        this.setState({
            uvc: e.target.value,
            index: this.state.index + 1
        })
    }
    handleChange = e => {
        e.persist()
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    deleteFile = (url) => {
        var array = this.state.files.filter(file => file !== url)
        this.setState({
            files: array
        })
    }
    showNext = () => {
        if(this.state.index > 0) {
            return ( <button onClick={this.handleNext} className="next-button"> Next </button> )
        } else if (this.state.index === 0) {
            return ( <button onClick={this.handleNext} className="next-button-long"> Don't have a Vin? </button> )
        }
    }
    showPrev = () => {
        if(this.state.index > 1) {
            return ( <button onClick={this.handlePrev} className="prev-button"> Prev </button> )
        } else if (this.state.index === 1) {
            return ( <button onClick={this.handlePrev} className="prev-button"> Enter Cars Vin </button> )
        }
    }
    showWidget = e => {
        e.preventDefault();
        let widget = window.cloudinary.createUploadWidget({ cloudName: 'duw9diprk', uploadPreset: 'my_preset'}, 
        (error, result) => {
            if (!error && result && result.event === "success") { 
                console.log('Done! Here is the image info: ', result.info.secure_url); 
                this.setState({ files: [...this.state.files, result.info.secure_url] })
              }
        })
        widget.open()
    }
    deleteFile = (url) => {
        var array = this.state.files.filter(file => file !== url)
        this.setState({ files: array })
    }
    noFiles = () => {
        this.setState({ offerDone: true })
    }
    headerSelector = () => {
        if(this.state.index === 0) {
            return ( 
            <div>
                <h1 className="form-header"> Enter Cars Vin </h1> 
                {this.state.vinError 
                ? <p className="error-text"> *Invalid Vin must be 17 digits with no spaces. </p>
                : null}
            </div>
           )
        } else if(this.state.index === 1) {
            return ( 
                <div>
                    <h1 className="form-header"> Select A Year </h1> 
                    {this.state.yearError 
                    ? <p className="error-text"> *Invalid Year. Year must be a 4 digit number. </p>
                    : null}
                </div>
            )
        } else if(this.state.index === 2) {
            return (
                <div>
                    <h1 className="form-header"> Select A Make </h1> 
                    {this.state.makeError 
                    ? <p className="error-text"> *Please Select a Make. </p>
                    : null}
                </div> )
        } else if(this.state.index === 3) {
            return ( 
                <div>
                    <h1 className="form-header"> Select A Model </h1> 
                    {this.state.modelError 
                    ? <p className="error-text"> *Please Select a Model. </p>
                    : null }
                </div>
            )
        } else if(this.state.index === 4) {
            return ( 
                <div>
                    <h1 className="form-header"> Select A Trim </h1> 
                    {this.state.trimError
                    ? <p className="error-text"> *Please Select a Trim. </p>
                    : null}
                </div>
            )
        } else if(this.state.index === 5) {
            return ( 
                <div>
                    <h1 className="form-header"> Enter Cars Miles </h1> 
                    {this.state.mileError 
                    ? <p className="error-text"> *Please Enter Your Cars Current Mileage. Must be a number. </p> 
                    : null }
                </div>
            
            )
        } else if(this.state.index === 6) {
            return (
                <div>
                    <h1 className="form-header"> Select Cars Condition </h1>
                    {this.state.conditionError 
                    ? <p className="error-text"> *Please Select Your Cars Condition </p>
                    : null}
                </div>
            )
        } else if(this.state.index === 7) {
            return ( 
                <div>
                    <h1 className="form-header"> What's Your Zip Code? </h1>
                    {this.state.zipError
                    ? <p className="error-text"> *Enter your zip code </p>
                    : null }
                </div>    
            )
        } else if(this.state.index === 8) {
            return ( 
                <div>
                    <h1 className="form-header"> Upload Pictures of Your Car </h1>
                    {this.state.fileError
                    ? <p className="error-text"> *Not uploading pictures will reduce the offer we give. </p> 
                    : null}
                </div>
            )
        }
    }
    formPart = () => {
        if(this.state.index === 0) {
            return ( 
                <div className="vin-container">
                    <input type="text"
                    maxLength="17"
                    value={this.state.vin}
                    onChange={this.handleChange}
                    name="vin"
                    placeholder="17 digit Vin Number"
                    className="offer-input" /> 
                    <button onClick={this.handleVinSubmit} className="vin-submit-button"> Submit </button>
                </div>
            )
        } else if(this.state.index === 1) {
            return ( 
                <div className="input-container">
                    <input type="number"
                    maxLength="4"
                    value={this.state.year}
                    onChange={this.handleChange}
                    name="year"
                    placeholder="Must be 4 digits"
                    className="offer-input"
                    />    
                </div>
            )
        } else if(this.state.index === 2) {
            return (
                this.props.blackCar.drilldown.class_list.map(list => list.year_list.map(year => year.make_list.map(make => (
                    <option onClick={this.handleOptionClick} key={make.name} value={make.name} name="make"> {make.name} </option>
                ))))
            )
        } else if(this.state.index === 3) {
            return (
                this.props.blackModels.drilldown.class_list.map(list => list.year_list.map(year => year.make_list.map(make => make.model_list.map(model => (
                    <option onClick={this.handleModelClick} key={model.name} value={model.name} name="model"> {model.name} </option>
                )))))
            )
        } else if(this.state.index === 4) {
            return (
                this.props.blackTrims.drilldown.class_list.map(list => list.year_list.map(year => year.make_list.map(make => make.model_list.map(model => model.series_list.map(series => series.style_list.map(style => (
                    <option onClick={this.handleTrimClick} key={style.uvc} value={style.uvc} name="trim">  {style.name} {series.name} </option>
                )))))))
            )
        } else if (this.state.index === 5) {
            return (
                <input type="text"
                    placeholder="Must be a number"
                    value={this.state.miles}
                    onChange={this.handleChange}
                    name="miles"
                    className="offer-input" />
            )
        } else if (this.state.index === 6) {
            return (
                <div className="form-radio-row">
                    <div className="form-radio-column">
                        <label htmlFor="condition"> Clean: </label>
                        <input onChange={this.handleChange} type="radio" value="clean" name="condition" /> 
                    </div>
                    <div className="form-radio-column">
                        <label htmlFor="condition"> Average: </label>
                        <input onChange={this.handleChange} type="radio" value="average" name="condition" />
                    </div>
                    <div className="form-radio-column">
                        <label htmlFor="condition"> Rough: </label>
                        <input onChange={this.handleChange} type="radio" value="rough" name="condition"/>
                    </div>
                </div>
            )
        } else if (this.state.index === 7) {
            return (
                <div>
                    <input type="number"
                        placeholder="5 Digit Number"
                        value={this.state.zip}
                        onChange={this.handleChange}
                        name="zip"
                        className="offer-input"
                        />
                </div>
            )
        } else if (this.state.index === 8) {
            return (
                <div>
                    <div className="upload-photos-box"> 
                        <h2 className="car-header2"> Upload Photos: </h2>
                        <button className="upload-button" onClick={this.showWidget}> Choose files </button>
                    </div>
                    <div className="thumbnail-container">
                        {this.state.files.map(file => <div className="file-thumbnail-holder" key={file} onClick={() => this.deleteFile(file)}> <img src={file} className="file-thumbnail" alt="uploaded File" /> <i className="fas fa-minus-circle delete-thumbnail"></i> </div>)}
                    </div>
                </div>
            )
        }
    } 
    render() {
        return (
            <div className="offer-page">
                {this.state.offerDone
                ? <Price files={this.state.files}  miles={this.state.miles} condition={this.state.condition} zip={this.state.zip} usedVin={this.state.usedVin} uvc={this.state.uvc} year={this.state.year} make={this.state.make} model={this.state.model} />
                : 
                <div className="form-container">
                    <div className="top-form-container">
                        {this.headerSelector()}
                    </div>    
                    <div className="form">
                        {this.formPart()}
                        <div className="form-bottom-row">
                            {this.showPrev()}
                            {this.showNext()}
                        </div>
                    </div>
                </div>         
                }       
            </div>
        )
    }
}

export default connect(state => state, { getBlackMakes, getBlackVin, getBlackModels, getBlackTrims, getBlackValue })(Offer);