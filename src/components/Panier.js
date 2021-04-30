import React, {Component} from 'react';

class Panier extends Component{
    constructor(props){
        super(props);

        this.state={
            isPayed:false,
            isClean:false
        }

        this.payer = this.payer.bind(this);
        this.clean = this.clean.bind(this);
    }

    payer(){
        this.setState({
            isPayed:true,
        })
        this.props.resetPanier()
    }

    clean(){
        this.setState({
            isClean:true,
        })
        this.props.resetPanier()
    }

    render(){
        const {panier} = this.props;

        return(
            <div>
                {
                    this.state.isClean &&
                    <p class="text-center">Votre panier a bien été vidé !</p>
                }
                {
                    this.state.isPayed &&
                    <p class="text-center">Merci d'avoir commandé sur notre site !</p>
                }
                {
                    !this.state.isPayed && !this.state.isClean &&
                    <div class="container">
                        <p class="text-center">Pomme(s) : {panier[0]}</p>
                        <p class="text-center">Framboise(s) : {panier[1]}</p>
                        <p class="text-center">Fraise(s) : {panier[2]}</p>
                        <div class="position-relative">
                            <a class="col-6"><button class="btn btn-primary" onClick={this.payer}>Payer</button></a>
                            <a class="col-6"><button class="btn btn-outline-danger" onClick={this.clean}>Vider le panier</button></a>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Panier;
