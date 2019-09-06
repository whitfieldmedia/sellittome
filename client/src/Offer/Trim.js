import React from 'react';
import { connect } from 'react-redux';
import { addUvc, addIndex, addStyle } from '../redux/Form';
import { getTrims } from '../redux/BlackValue'

class Trim extends React.Component {
    constructor() {
        super()
        this.state = { loaded: false, uvc: '' }
    }
    componentDidMount() {
        this.props.getTrims(this.props.form.year, this.props.form.make, this.props.form.model)
        if(this.props.form.uvc.length > 0) {
            this.setState({ uvc: this.props.form.uvc })
        }
    }
    componentDidUpdate() {
        if(this.props.blackValue.drilldown.class_list && !this.state.loaded) {
            this.setState({ loaded: true })
        }
    }
    handleClick = (uvc, trim) => {
        this.props.addUvc(uvc);
        this.props.addStyle(trim);
        var index = this.props.form.index + 1;
        this.props.addIndex(index);
    }
    mapTrims = () => {
        if(this.state.loaded) {
            return (
                this.props.blackValue.drilldown.class_list.map(list => list.year_list.map(year => year.make_list.map(make => make.model_list.map(model => model.series_list.map(series => series.style_list.map(style => (
                    <a href="#" className="option" onClick={() => this.handleClick(style.uvc, style.name)} key={style.uvc} value={style.uvc} name="trim">  
                        {style.name} {series.name}
                        </a>
                )))))))
            )
        }
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