import { Component } from 'react';

export default class BaseNumberInput extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
         }
        this.handleChange = this.handleChange.bind(this); 
    }

    handleChange(e){
        this.props.onChangeBase(e);
    }


        
    render() { 
        const { type, value, error } = this.props
        return ( 
            <div className="container col p-3 ">
                <div>
                    <label>{type}</label>
                </div>
                <div>
                    <input className="form-control" onChange={this.handleChange} type="text" name={type} value={value} />  
                </div>
                <div className="mt-3">
                    {error.length ? <small className="alert alert-danger ">{error}</small>: ""}
                </div>
            </div>
        );
    }
}

