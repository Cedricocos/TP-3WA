import React from 'react';
import Numbers from './Numbers.js'

class Form extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            value: '',
            numbers : [],
            message : ''
        }
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.shuffle = this.shuffle.bind(this);
    }
  
    handleChange(event){
        const { value } = event.target;
  
        this.setState({ value : value, message : '' });
    }
  
    handleSubmit(event){
        event.preventDefault();
  
        const { value: number, numbers } = this.state;
  
        // vérification erreurs formulaires user déjà dans la liste
        if(numbers.includes(number)){
            this.setState({
                message : `Attention le nombre  ${number} existe déjà dans la liste`
            });
  
            return;
        }

        // eslint-disable-next-line
        if(parseInt(number) !=  number){
            this.setState({
                message : `Attention votre nombre doit être entier`
            });
  
            return;
        }
  
         // vérification erreurs formulaires champ vide
         if(number.trim() === ''){
            this.setState({
                message : `Attention votre champ est vide`
            });
  
            return;
        }
  
        numbers.push(number);
  
        this.setState({
            numbers : numbers,
            message : `Le nombre ${number} a bien été ajouté dans la liste`
        });
    }

    shuffle(){
        this.setState({ numbers : this.state.numbers.sort(()=> Math.random() - 0.5)})
        return;
    }
    
    render(){
        const { value: number, message, numbers  } = this.state ;
        
        return(
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id="number" value={number} onChange={this.handleChange} />
                    </div>
                    <button type="submit">Ajouter</button>
                </form> 
                <button onClick={this.shuffle}>Mélanger</button>
                {message !== '' && (
                    <p>{message}</p>
                ) }
  
                {numbers.length > 0 && (
                    <Numbers numbers={numbers} />
                )}
            </React.Fragment>
        );
    }
}

export default Form;