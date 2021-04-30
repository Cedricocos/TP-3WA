import React, {Component} from 'react';

class Fruit extends Component{
    constructor(props){
        super(props);

        this.state={
            nbFruit: props.nbFruit,
        }

        this.handleChange = this.handleChange.bind(this);
        this.enleverFruits = this.enleverFruits.bind(this);
    }

    handleChange(event){
        const {value} = event.target;
        this.setState({
            nbFruit: value
        })
        this.props.changeFruit(value)
    }

    enleverFruits(){
        this.setState({
            nbFruit: 0
        })
    }

    componentDidUpdate(){
        if(this.props.nbFruit===0){
            document.getElementById(this.props.fruit).value=0;
        }
    }

    render(){
        const {fruit} = this.props;

        return(
            <div class="col-12 p-3">
                <label class="col-4">Nombre de {fruit} :</label>
                <input class="col-2" type="number" id={fruit} name={fruit} value={this.state.nbFruit} onChange={this.handleChange} min="0"></input>
                <a class="col-1"></a>
                <button class="btn btn-outline-danger" onClick={this.enleverFruits}>Enlever</button>
            </div>
        )
    }
}

export default Fruit;
