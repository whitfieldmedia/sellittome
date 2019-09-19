import React from 'react';
import { connect } from 'react-redux';
import { addUvc, addIndex, addStyle } from '../redux/Form';
import { getTrims } from '../redux/BlackValue'

class Trim extends React.Component {
    constructor() {
        super()
        this.state = { uvc: '', style: '' }
    }
    componentDidMount() {
        this.props.getTrims(this.props.form.year, this.props.form.make, this.props.form.model)
        if(this.props.form.uvc.length > 0) {
            this.setState({ uvc: this.props.form.uvc })
        }
        if(this.props.form.style.length > 0) {
            this.setState({
                style: this.props.form.style
            })
        }
    }
    handleClick = (uvc, trim, series) => {
        console.log("TRIM: " + trim, 'SERIES: ' + series)
        var style = (trim + ' ' + series)
        this.setState({
            style: style 
        })
        setTimeout(
            function() {
                this.props.addUvc(uvc);
                this.props.addStyle(style);
                var index = this.props.form.index + 1;
                this.props.addIndex(index);
            }.bind(this), 500
        )
    }
    mapTrims = () => {
        return (
            this.props.blackValue.drilldown.class_list.map(list => list.year_list.map(year => year.make_list.map(make => make.model_list.map(model => model.series_list.map(series => series.style_list.map(style => (
                <button className="option" onClick={() => this.handleClick(style.uvc, style.name, series.name)} key={style.uvc} value={style.uvc} name="trim">  
                    {style.name} {series.name}
                    <span className={(this.state.style === (style.name + ' ' + series.name)) ? "option-selected" : "not-selected"}>&#10003;</span>
                    </button>
            )))))))
        )
    }
    render() {
        return (
            <div className="option-container">
                {this.mapTrims()}
            </div>
        )
    }
}

export default connect(state => state, { addUvc, getTrims, addIndex, addStyle })(Trim);