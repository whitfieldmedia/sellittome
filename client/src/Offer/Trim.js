import React from 'react';
import { connect } from 'react-redux';
import { addUvc } from '../redux/Form';

class Trim extends React.Component {
    componentDidUpdate() {
        if(this.props.form.uvc.length > 0) {
            this.props.handleNext();
        }
    }
    handleClick = e => {
        e.preventDefault();
        this.props.addUvc(e.target.value);
    }
    render() {
        return (
            <div className="option-container">
                {this.props.blackTrims.drilldown.class_list.map(list => list.year_list.map(year => year.make_list.map(make => make.model_list.map(model => model.series_list.map(series => series.style_list.map(style => (
                    <option className="option" onClick={this.handleClick} key={style.uvc} value={style.uvc} name="trim">  
                        {style.name} {series.name} 
                        </option>
                )))))))}
            </div>
        )
    }
}

export default connect(state => state, { addUvc })(Trim);