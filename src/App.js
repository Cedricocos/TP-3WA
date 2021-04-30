import React, {Component} from 'react';
import Home from './components/Home';
import Fruits from './components/Fruits';
import Panier from './components/Panier';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      // Gestion page et bouton "Home"
      onPageHome: true,
      homeStyle: 'primary',
      // Gestion page et bouton "Fruits"
      onPageFruits: false,
      fruitsStyle: 'light',
      // Gestion page, bouton et remplissage "Panier"
      onPagePanier: false,
      inPanier: [0,0,0],
      panierStyle: 'light',
    }

    this.clickHome = this.clickHome.bind(this);
    this.clickFruits = this.clickFruits.bind(this);
    this.clickPanier = this.clickPanier.bind(this);
  }

  clickHome(){
    this.setState({
      onPageHome: true,
      homeStyle: 'primary',
      onPageFruits: false,
      fruitsStyle: 'light',
      onPagePanier: false,
      panierStyle: 'light',
    })
  }

  clickFruits(){
    this.setState({
      onPageHome: false,
      homeStyle: 'light',
      onPageFruits: true,
      fruitsStyle: 'primary',
      onPagePanier: false,
      panierStyle: 'light',
    })
  }

  clickPanier(){
    this.setState({
      onPageHome: false,
      homeStyle: 'light',
      onPageFruits: false,
      fruitsStyle: 'light',
      onPagePanier: true,
      panierStyle: 'primary',
    })
  }

  comptePanier(){
    if(this.state.inPanier.length===0){
      return 0;
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return this.state.inPanier.reduce(reducer);
  }

  changeInPanier(tab){
    let newPanier = [];
    for(let i=0; i<tab.length; i++){
      newPanier[i] = tab[i]+this.state.inPanier[i];
    }
    this.setState({ inPanier: newPanier});
  }

  resetPanier(){
    this.setState({ inPanier: [0,0,0]});
  }

  render(){
    const{onPageHome, homeStyle, onPageFruits, fruitsStyle, onPagePanier, panierStyle, inPanier} = this.state;

    return(
      <div class="container">
        <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <ul class="nav nav-pills">
            <li class="nav-item col-2"><button class={"btn btn-"+homeStyle} onClick={this.clickHome}>Home</button></li>
            <a class="col-1"></a>
            <li class="nav-item"><button class={"btn btn-"+fruitsStyle} onClick={this.clickFruits}>Nos fruits</button></li>
            <a class="col-1"></a>
            {
              this.comptePanier() == 0 &&
              <li class="nav-item"><button class={"btn btn-secondary"}>Votre panier est vide</button></li>
            }
            {
              !this.comptePanier() == 0 &&
              <li class="nav-item"><button class={"btn btn-"+panierStyle} onClick={this.clickPanier}>Panier ({this.comptePanier()} article(s))</button></li>
            }
          </ul>
        </header>
        { 
          onPageHome && 
          (<Home/>)
        }
        { 
          onPageFruits && 
          (<Fruits changeInPanier={newPanier => this.changeInPanier(newPanier)}/>)
        }
        { 
          onPagePanier && 
          (<Panier panier={inPanier} resetPanier={val => this.resetPanier()}/>)
        }
      </div>
    )
  }
}

export default App;
