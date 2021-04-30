import React, {Component} from 'react';
import Fruit from './Fruit';

class Fruits extends Component{
    constructor(props){
        super(props);

        this.state={
            nbApple: 0,
            nbRaspberry: 0,
            nbStrawberry: 0,
        }

        this.changeApple = this.changeApple.bind(this);
        this.changeRaspberry = this.changeRaspberry.bind(this);
        this.changeStrawberry = this.changeStrawberry.bind(this);
        this.ajouterAuPanier = this.ajouterAuPanier.bind(this);
    }

    changeApple(nb){
        if(nb>0){
            this.setState({ nbApple: nb});
        }
    }

    changeRaspberry(nb){
        if(nb>0){
            this.setState({ nbRaspberry: nb });
        }
    }

    changeStrawberry(nb){
        if(nb>0){
            this.setState({ nbStrawberry: nb });
        }
    }

    ajouterAuPanier() {
        const {nbApple, nbRaspberry, nbStrawberry} = this.state;

        this.props.changeInPanier([parseInt(nbApple), parseInt(nbRaspberry), parseInt(nbStrawberry)])

        this.setState({
            nbApple: 0,
            nbRaspberry: 0,
            nbStrawberry: 0,
        })
    }

    render(){
        const {nbApple, nbRaspberry, nbStrawberry} = this.state;
        return(
            <div class="container">
                <Fruit fruit='pomme' nbFruit={nbApple} changeFruit={nb => this.changeApple(nb)}/>
                <Fruit fruit='framboise' nbFruit={nbRaspberry} changeFruit={nb => this.changeRaspberry(nb)}/>
                <Fruit fruit='fraise' nbFruit={nbStrawberry} changeFruit={nb => this.changeStrawberry(nb)}/>
                <button class="btn btn-primary" onClick={this.ajouterAuPanier}>Ajouter dans le panier</button>
            </div>
        )
    }
}

export default Fruits;
